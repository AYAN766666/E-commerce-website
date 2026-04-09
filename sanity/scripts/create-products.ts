// Script to create products in Sanity
// Run this with: npx tsx sanity/scripts/create-products.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'u9ap71p1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
})

const products = [
  {
    name: 'Premium Wireless Headphones',
    slug: {
      _type: 'slug',
      current: 'premium-wireless-headphones',
    },
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort padding.',
    price: 4999,
    originalPrice: 7999,
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t-1234x1234-jpg',
          _type: 'reference',
        },
      },
    ],
    category: 'electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviewCount: 256,
  },
  {
    name: 'Smart Watch Pro',
    slug: {
      _type: 'slug',
      current: 'smart-watch-pro',
    },
    description: 'Stay connected and track your fitness with our advanced smartwatch. Features heart rate monitoring, GPS, and 7-day battery life.',
    price: 12999,
    originalPrice: 15999,
    images: [],
    category: 'electronics',
    stock: 30,
    featured: true,
    rating: 4.9,
    reviewCount: 189,
  },
  {
    name: 'Designer Sneakers',
    slug: {
      _type: 'slug',
      current: 'designer-sneakers',
    },
    description: 'Premium quality sneakers with modern design. Comfortable for all-day wear with breathable material and cushioned sole.',
    price: 8999,
    originalPrice: 12999,
    images: [],
    category: 'clothing',
    stock: 25,
    featured: true,
    rating: 4.7,
    reviewCount: 142,
  },
  {
    name: 'Minimalist Backpack',
    slug: {
      _type: 'slug',
      current: 'minimalist-backpack',
    },
    description: 'Sleek and functional backpack perfect for daily commute. Water-resistant material with laptop compartment.',
    price: 3499,
    originalPrice: 4999,
    images: [],
    category: 'other',
    stock: 40,
    featured: true,
    rating: 4.6,
    reviewCount: 98,
  },
  {
    name: 'Mechanical Keyboard RGB',
    slug: {
      _type: 'slug',
      current: 'mechanical-keyboard-rgb',
    },
    description: 'Premium mechanical keyboard with customizable RGB lighting. Blue switches for tactile feedback.',
    price: 6999,
    originalPrice: 9999,
    images: [],
    category: 'electronics',
    stock: 35,
    featured: false,
    rating: 4.8,
    reviewCount: 312,
  },
  {
    name: 'Gaming Mouse Pro',
    slug: {
      _type: 'slug',
      current: 'gaming-mouse-pro',
    },
    description: 'High-precision gaming mouse with 16000 DPI sensor and customizable buttons.',
    price: 3999,
    originalPrice: 5999,
    images: [],
    category: 'electronics',
    stock: 45,
    featured: false,
    rating: 4.7,
    reviewCount: 198,
  },
  {
    name: 'Denim Jacket Classic',
    slug: {
      _type: 'slug',
      current: 'denim-jacket-classic',
    },
    description: 'Timeless denim jacket with modern fit. Perfect for layering in any season.',
    price: 5499,
    originalPrice: 7999,
    images: [],
    category: 'clothing',
    stock: 20,
    featured: false,
    rating: 4.5,
    reviewCount: 87,
  },
  {
    name: 'Running Shoes Elite',
    slug: {
      _type: 'slug',
      current: 'running-shoes-elite',
    },
    description: 'Professional running shoes with advanced cushioning technology. Lightweight and breathable.',
    price: 7999,
    originalPrice: 10999,
    images: [],
    category: 'sports',
    stock: 30,
    featured: true,
    rating: 4.9,
    reviewCount: 421,
  },
  {
    name: 'Yoga Mat Premium',
    slug: {
      _type: 'slug',
      current: 'yoga-mat-premium',
    },
    description: 'Extra thick yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises.',
    price: 1999,
    originalPrice: 2999,
    images: [],
    category: 'sports',
    stock: 60,
    featured: false,
    rating: 4.6,
    reviewCount: 156,
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: {
      _type: 'slug',
      current: 'stainless-steel-water-bottle',
    },
    description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.',
    price: 899,
    originalPrice: 1499,
    images: [],
    category: 'sports',
    stock: 100,
    featured: false,
    rating: 4.7,
    reviewCount: 234,
  },
  {
    name: 'Leather Wallet',
    slug: {
      _type: 'slug',
      current: 'leather-wallet',
    },
    description: 'Genuine leather wallet with RFID blocking technology. Slim design with multiple card slots.',
    price: 2499,
    originalPrice: 3999,
    images: [],
    category: 'other',
    stock: 50,
    featured: false,
    rating: 4.5,
    reviewCount: 112,
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: {
      _type: 'slug',
      current: 'portable-bluetooth-speaker',
    },
    description: 'Compact speaker with powerful sound. 12-hour battery life and waterproof design.',
    price: 3499,
    originalPrice: 4999,
    images: [],
    category: 'electronics',
    stock: 40,
    featured: true,
    rating: 4.6,
    reviewCount: 289,
  },
]

async function createProducts() {
  console.log('Creating products in Sanity...')
  
  for (const product of products) {
    try {
      // Use images from Unsplash URLs instead of Sanity assets
      const productDoc = {
        _type: 'product',
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        images: product.images.length > 0 ? product.images : [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: `image-${product.name.toLowerCase().replace(/\s+/g, '-')}-unsplash`,
            },
          },
        ],
        category: product.category,
        stock: product.stock,
        featured: product.featured,
        rating: product.rating,
        reviewCount: product.reviewCount,
      }
      
      await client.create(productDoc)
      console.log(`✓ Created: ${product.name}`)
    } catch (error: any) {
      console.error(`✗ Error creating ${product.name}:`, error.message)
    }
  }
  
  console.log('\nDone! Products created in Sanity.')
}

createProducts()
