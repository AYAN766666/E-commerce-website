'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  User,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  AlertCircle,
  Search,
  Truck,
  Package,
  IndianRupee,
} from 'lucide-react';
import { useCartStore, useOrderStore, generateOrderNumber, type Order } from '@/lib/local-orders';
import Link from 'next/link';
import { validatePincode, getCityFromPincode } from '@/lib/pincode-validator';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [pincodeValid, setPincodeValid] = useState(false);
  const [checkedPincode, setCheckedPincode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Only Cash on Delivery is available
  const paymentMethod = 'cod' as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'pincode') {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, pincode: numericValue });

      // Clear validation when user types
      if (checkedPincode) {
        setCheckedPincode('');
        setPincodeError('');
        setPincodeValid(false);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkPincode = () => {
    const result = validatePincode(formData.pincode);
    setCheckedPincode(formData.pincode);

    if (!result.valid) {
      setPincodeError(result.message);
      setPincodeValid(false);
    } else if (!result.isServiceable) {
      setPincodeError(result.message);
      setPincodeValid(false);
    } else {
      setPincodeError('');
      setPincodeValid(true);
      // Auto-fill city if possible
      const city = getCityFromPincode(formData.pincode);
      if (city !== 'Unknown' && !formData.city) {
        setFormData(prev => ({ ...prev, city }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate pincode format (but don't block if not serviceable)
    if (!formData.pincode || formData.pincode.length !== 6) {
      setPincodeError('Please enter a valid 6-digit pincode');
      setPincodeValid(false);
      return;
    }

    // Auto-check pincode if not already checked
    if (!pincodeValid && !checkedPincode) {
      checkPincode();
    }

    setIsProcessing(true);

    try {
      // Generate order number
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // Prepare order data
      const orderData: Omit<Order, 'orderNumber' | 'orderedAt'> = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          slug: item.slug,
        })),
        paymentMethod: paymentMethod,
        paymentStatus: 'pending',
        orderStatus: 'processing',
        subtotal: totalPrice(),
        shippingCost: 0,
        tax: 0,
        totalAmount: totalPrice(),
        notes: '',
      };

      // Save order to local storage
      addOrder({
        ...orderData,
        orderNumber: newOrderNumber,
        orderedAt: new Date().toISOString(),
      });

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      setIsProcessing(false);
      alert('Failed to place order. Please try again.');
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checkout
          </p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aurora-btn"
            >
              Go to Shop
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md bg-white rounded-3xl p-8 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order will be delivered soon!
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-bold text-aurora-primary">{orderNumber}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-700">
              <strong>Note:</strong> Your order is saved locally. You can view it in the Orders page.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="aurora-btn flex-1"
              >
                Continue Shopping
              </motion.button>
            </Link>
            <Link href="/admin/orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold flex-1"
              >
                View Orders
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-aurora-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shop</span>
            </motion.button>
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black"
          >
            <span className="aurora-text">Checkout</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-gradient-1 to-aurora-gradient-2 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Shipping Information</h2>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                      placeholder="123 Main Street, Apartment..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
                        placeholder="400001"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={checkPincode}
                        className="px-4 py-3 bg-aurora-primary text-white rounded-xl font-semibold"
                        title="Check delivery availability"
                      >
                        <Search className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter 6-digit pincode for delivery
                    </p>
                    {pincodeError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 mt-2 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{pincodeError}</span>
                      </motion.div>
                    )}
                    {pincodeValid && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 mt-2 text-green-600 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Delivery available to this pincode!</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-gradient-2 to-aurora-gradient-3 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              {/* COD Only - Enhanced Display */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0"
                  >
                    <DollarSign className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-bold text-green-800 mb-2"
                    >
                      Cash on Delivery
                    </motion.h3>
                    <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-green-700 mb-4"
                    >
                      Pay with cash when your order is delivered to your doorstep. No advance payment required!
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <Truck className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Free Shipping</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <Package className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Easy Returns</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Secure</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Info Banner */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-800">100% Cash on Delivery</p>
                    <p className="text-sm text-blue-600 mt-1">
                      This store only accepts Cash on Delivery for your convenience and security.
                      Pay only when you receive your order!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-lg sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-aurora-primary">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold aurora-text">
                    ₹{totalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`aurora-btn w-full py-4 text-lg mt-6 flex items-center justify-center space-x-2 ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Place Order</span>
                  </>
                )}
              </motion.button>

              <p className="text-xs text-center text-gray-500 mt-2">
                By placing this order, you agree to our Terms & Conditions
              </p>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-4 mt-6 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
