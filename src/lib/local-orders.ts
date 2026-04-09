import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}

export interface Order {
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    pincode: string
  }
  items: CartItem[]
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  subtotal: number
  shippingCost: number
  tax: number
  totalAmount: number
  notes?: string
  orderedAt: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderNumber: string, status: string) => void
  getOrders: () => Order[]
}

// Cart Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        console.log('Adding to cart:', item);
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            const newState = {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
            console.log('Updated quantity, new state:', newState);
            return newState;
          }
          const newState = { items: [...state.items, { ...item, quantity: 1 }] }
          console.log('Added new item, new state:', newState);
          return newState;
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      closeCart: () => set({ isOpen: false }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

// Orders Store - Local Storage
export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      updateOrderStatus: (orderNumber, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderNumber === orderNumber ? { ...order, orderStatus: status } : order
          ),
        }))
      },

      getOrders: () => {
        return get().orders
      },
    }),
    {
      name: 'orders-storage',
    }
  )
)

// Helper function to generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

// Place order (save to local storage)
export async function placeOrder(orderData: Omit<Order, 'orderNumber' | 'orderedAt'>): Promise<Order> {
  const order: Order = {
    ...orderData,
    orderNumber: generateOrderNumber(),
    orderedAt: new Date().toISOString(),
  }

  // Save to order store (localStorage)
  const { useOrderStore } = await import('./local-orders')
  useOrderStore.getState().addOrder(order)

  return order
}
