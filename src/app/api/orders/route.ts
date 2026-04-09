import { NextRequest, NextResponse } from 'next/server'

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customer,
      shippingAddress,
      items,
      totalAmount,
    } = body

    // Validate required fields
    if (!customer || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderNumber = generateOrderNumber()

    // Return success - order is saved locally in browser via useOrderStore
    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: {
        orderNumber,
        totalAmount,
        orderedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
