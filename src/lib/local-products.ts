// Local products data - fetched from public folder images
// No Sanity needed - everything is local!

export interface Product {
  _id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  publicImagePath: string
  category: string
  stock: number
  featured: boolean
  rating: number
  reviewCount: number
  description: string
}

// Product categories based on image names
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function categorizeImage(filename: string): {
  category: string
  name: string
  price: number
  description: string
} {
  const lowerName = filename.toLowerCase()

  // Electronics - Laptops
  if (lowerName.includes('laptop')) {
    const laptopNames = [
      'Premium Laptop Pro',
      'UltraBook Slim',
      'Gaming Beast Laptop',
      'Business Laptop',
    ]
    const randomName = laptopNames[Math.floor(Math.random() * laptopNames.length)]
    return {
      category: 'electronics',
      name: randomName,
      price: Math.floor(Math.random() * 100000) + 40000,
      description: 'High-performance laptop with latest processor, 16GB RAM, and 512GB SSD. Perfect for professionals and gamers.',
    }
  }

  // Watches
  if (lowerName.includes('blue') && lowerName.includes('watch')) {
    return {
      category: 'clothing',
      name: 'Stylish Blue Watch',
      price: 4999,
      description: 'Elegant blue wristwatch with premium build quality. Perfect accessory for formal occasions.',
    }
  }

  // Bags, Purses, Handbags
  if (lowerName.includes('pic')) {
    const bagTypes = [
      { name: 'Designer Handbag', price: 12999 },
      { name: 'Elegant Purse', price: 3499 },
      { name: 'Premium Leather Bag', price: 8999 },
      { name: 'Classic Tote Bag', price: 2999 },
      { name: 'Vintage Style Bag', price: 5499 },
      { name: 'Designer Clutch', price: 4499 },
      { name: 'Casual Backpack', price: 3999 },
      { name: 'Luxury Evening Bag', price: 6999 },
    ]
    const randomBag = bagTypes[Math.floor(Math.random() * bagTypes.length)]
    return {
      category: 'clothing',
      name: randomBag.name,
      price: randomBag.price,
      description: `Premium quality ${randomBag.name.toLowerCase()} made from finest materials. Stylish and durable.`,
    }
  }

  // Sports items from product-cover images
  if (lowerName.includes('product-cover')) {
    const sportsItems = [
      { name: 'Sports Fitness Tracker', price: 4999 },
      { name: 'Running Shoes Pro', price: 6999 },
      { name: 'Yoga Mat Premium', price: 1999 },
      { name: 'Dumbbells Set', price: 8999 },
      { name: 'Resistance Bands Kit', price: 1499 },
      { name: 'Jump Rope Speed', price: 599 },
      { name: 'Gym Bag Pro', price: 2999 },
      { name: 'Sports Water Bottle', price: 899 },
    ]
    const randomItem = sportsItems[Math.floor(Math.random() * sportsItems.length)]
    return {
      category: 'sports',
      name: randomItem.name,
      price: randomItem.price,
      description: 'Professional sports equipment for fitness enthusiasts. High quality and durable.',
    }
  }

  // Home & Living
  if (lowerName.includes('last')) {
    const homeItems = [
      { name: 'Home Decor Set', price: 5999 },
      { name: 'Premium Home Accents', price: 9999 },
      { name: 'Modern Living Set', price: 7499 },
    ]
    const randomItem = homeItems[Math.floor(Math.random() * homeItems.length)]
    return {
      category: 'home',
      name: randomItem.name,
      price: randomItem.price,
      description: 'Beautiful home decor item to enhance your living space aesthetics.',
    }
  }

  // New arrivals - Electronics
  if (lowerName.includes('new')) {
    const newItems = [
      { name: 'Premium Headphones', price: 14999 },
      { name: 'Wireless Earbuds Pro', price: 8999 },
      { name: 'Smart Speaker', price: 6999 },
      { name: 'Portable Bluetooth Speaker', price: 3499 },
    ]
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)]
    return {
      category: 'electronics',
      name: randomItem.name,
      price: randomItem.price,
      description: 'Latest electronic gadget with premium features and excellent sound quality.',
    }
  }

  // Car accessories
  if (lowerName.includes('car')) {
    return {
      category: 'other',
      name: 'Modern Car Accessory',
      price: 2499,
      description: 'Premium car accessory for modern vehicles. Enhances comfort and style.',
    }
  }

  // Couple items
  if (lowerName.includes('couple')) {
    return {
      category: 'other',
      name: 'Couple Gift Set',
      price: 4999,
      description: 'Special gift set for couples. Perfect for anniversaries and special occasions.',
    }
  }

  // Default - Fashion/Lifestyle
  return {
    category: 'clothing',
    name: `Fashion Item ${filename.replace(/[\d\-.\s]/g, '').substring(0, 15)}`,
    price: Math.floor(Math.random() * 5000) + 999,
    description: 'Trendy fashion item for modern lifestyle. High quality and stylish.',
  }
}

// Pre-defined products for immediate use (fallback)
export const fallbackProducts: Product[] = [
  {
    _id: 'product-laptop-1',
    name: 'Premium Laptop Pro',
    slug: 'premium-laptop-pro',
    price: 89999,
    originalPrice: 109999,
    publicImagePath: '/laptop1.png',
    category: 'electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviewCount: 245,
    description: 'High-performance laptop with latest processor, 16GB RAM, and 512GB SSD.',
  },
  {
    _id: 'product-laptop-2',
    name: 'UltraBook Slim',
    slug: 'ultrabook-slim',
    price: 64999,
    originalPrice: 74999,
    publicImagePath: '/laptop2.png',
    category: 'electronics',
    stock: 35,
    featured: true,
    rating: 4.6,
    reviewCount: 189,
    description: 'Lightweight and powerful ultrabook with 14-hour battery life.',
  },
  {
    _id: 'product-laptop-3',
    name: 'Gaming Beast Laptop',
    slug: 'gaming-beast-laptop',
    price: 149999,
    originalPrice: 179999,
    publicImagePath: '/laptop3.jpg',
    category: 'electronics',
    stock: 20,
    featured: true,
    rating: 4.9,
    reviewCount: 312,
    description: 'Ultimate gaming laptop with RTX graphics, 32GB RAM, and 1TB SSD.',
  },
  {
    _id: 'product-laptop-4',
    name: 'Business Laptop',
    slug: 'business-laptop',
    price: 54999,
    originalPrice: 64999,
    publicImagePath: '/laptop4.png',
    category: 'electronics',
    stock: 45,
    featured: false,
    rating: 4.5,
    reviewCount: 156,
    description: 'Reliable business laptop with excellent keyboard and long battery life.',
  },
  {
    _id: 'product-bag-1',
    name: 'Designer Handbag',
    slug: 'designer-handbag',
    price: 12999,
    originalPrice: 18999,
    publicImagePath: '/pic.jpg',
    category: 'clothing',
    stock: 40,
    featured: true,
    rating: 4.6,
    reviewCount: 201,
    description: 'Luxury designer handbag made from premium leather.',
  },
  {
    _id: 'product-bag-2',
    name: 'Elegant Purse',
    slug: 'elegant-purse',
    price: 3499,
    originalPrice: 4999,
    publicImagePath: '/pic1.jpg',
    category: 'clothing',
    stock: 60,
    featured: false,
    rating: 4.4,
    reviewCount: 78,
    description: 'Compact and elegant purse perfect for evening outings.',
  },
  {
    _id: 'product-bag-3',
    name: 'Premium Leather Bag',
    slug: 'premium-leather-bag',
    price: 8999,
    originalPrice: 11999,
    publicImagePath: '/pic2.jpg',
    category: 'clothing',
    stock: 55,
    featured: true,
    rating: 4.5,
    reviewCount: 167,
    description: 'Handcrafted premium leather bag with multiple compartments.',
  },
  {
    _id: 'product-sports-1',
    name: 'Sports Fitness Tracker',
    slug: 'sports-fitness-tracker',
    price: 4999,
    originalPrice: 7999,
    publicImagePath: '/product-cover-5 (10).png',
    category: 'sports',
    stock: 75,
    featured: true,
    rating: 4.5,
    reviewCount: 345,
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
  },
  {
    _id: 'product-sports-2',
    name: 'Running Shoes Pro',
    slug: 'running-shoes-pro',
    price: 6999,
    originalPrice: 9999,
    publicImagePath: '/product-cover-5 (11).png',
    category: 'sports',
    stock: 60,
    featured: true,
    rating: 4.7,
    reviewCount: 421,
    description: 'Professional running shoes with advanced cushioning technology.',
  },
  {
    _id: 'product-home-1',
    name: 'Home Decor Set',
    slug: 'home-decor-set',
    price: 5999,
    originalPrice: 8999,
    publicImagePath: '/last.jpg.png',
    category: 'home',
    stock: 50,
    featured: false,
    rating: 4.5,
    reviewCount: 134,
    description: 'Beautiful home decor set to enhance your living space.',
  },
  {
    _id: 'product-electronics-1',
    name: 'Premium Headphones',
    slug: 'premium-headphones',
    price: 14999,
    originalPrice: 19999,
    publicImagePath: '/new.jpg',
    category: 'electronics',
    stock: 40,
    featured: true,
    rating: 4.7,
    reviewCount: 289,
    description: 'Noise-cancelling premium headphones with exceptional sound quality.',
  },
  {
    _id: 'product-electronics-2',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    price: 8999,
    originalPrice: 12999,
    publicImagePath: '/new1.jpg',
    category: 'electronics',
    stock: 85,
    featured: true,
    rating: 4.5,
    reviewCount: 412,
    description: 'True wireless earbuds with active noise cancellation.',
  },
]
