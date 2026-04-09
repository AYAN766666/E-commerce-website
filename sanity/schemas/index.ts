import { type SchemaTypeDefinition } from 'sanity'

export const product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (for discount)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'imageUrl',
      title: 'External Image URL (for testing)',
      type: 'url',
      description: 'Optional: Use this for external images during testing',
    },
    {
      name: 'publicImagePath',
      title: 'Public Folder Image Path',
      type: 'string',
      description: 'Path to image in public folder (e.g., /laptop1.png, /pic.jpg)',
      validation: (Rule) => Rule.uri({ scheme: [/^\/.*/] }).error('Path must start with /'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Electronics', value: 'electronics' },
          { title: 'Clothing', value: 'clothing' },
          { title: 'Home & Living', value: 'home' },
          { title: 'Sports', value: 'sports' },
          { title: 'Books', value: 'books' },
          { title: 'Toys', value: 'toys' },
          { title: 'Beauty', value: 'beauty' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
    },
    {
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    },
    {
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, price } = selection
      return {
        title: title,
        subtitle: `$${price?.toFixed(2) || 'N/A'}`,
      }
    },
  },
}

export const category: SchemaTypeDefinition = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}

export const banner: SchemaTypeDefinition = {
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'url',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}

export const order: SchemaTypeDefinition = {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
    },
    {
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
      ],
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
        },
        {
          name: 'pincode',
          title: 'Pincode',
          type: 'string',
        },
      ],
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productId',
              title: 'Product ID',
              type: 'string',
            },
            {
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'image',
              title: 'Product Image',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'productName',
              quantity: 'quantity',
              price: 'price',
              media: 'image',
            },
            prepare(selection) {
              const { title, quantity, price } = selection
              return {
                title: title,
                subtitle: `Qty: ${quantity} - ₹${price?.toFixed(2)}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'Card Payment', value: 'card' },
        ],
      },
    },
    {
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Processing', value: 'processing' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Out for Delivery', value: 'out_for_delivery' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'processing',
    },
    {
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
    },
    {
      name: 'shippingCost',
      title: 'Shipping Cost',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'tax',
      title: 'Tax',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
    },
    {
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
      rows: 2,
    },
    {
      name: 'orderedAt',
      title: 'Ordered At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customer: 'customer.firstName',
      total: 'totalAmount',
      status: 'orderStatus',
    },
    prepare(selection) {
      const { orderNumber, customer, total, status } = selection
      return {
        title: `Order ${orderNumber}`,
        subtitle: `${customer || 'Guest'} - ₹${total?.toFixed(2) || '0'} - ${status || 'processing'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newest',
      by: [{ field: 'orderedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldest',
      by: [{ field: 'orderedAt', direction: 'asc' }],
    },
  ],
}

export const schemaTypes = [product, category, banner, order]
