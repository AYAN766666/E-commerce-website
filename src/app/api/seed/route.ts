import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { promises as fs } from 'fs'
import path from 'path'

// Product categories based on image names
function categorizeImage(filename: string): { category: string; name: string; price: number; description: string } {
  const lowerName = filename.toLowerCase()
  
  // Electronics
  if (lowerName.includes('laptop')) {
    return {
      category: 'electronics',
      name: `Premium Laptop ${filename.replace(/[\d\-.\s]/g, '').replace(/(png|jpg|jpeg|webp)/gi, '')}`,
      price: Math.floor(Math.random() * 100000) + 40000,
      description: 'High-performance laptop with latest processor and premium build quality.',
    }
  }
  
  if (lowerName.includes('blue') && (lowerName.includes('watch') || lowerName.includes('clock'))) {
    return {
      category: 'clothing',
      name: 'Stylish Blue Watch',
      price: 4999,
      description: 'Elegant blue wristwatch with premium build quality.',
    }
  }
  
  if (lowerName.includes('pic') || lowerName.includes('bag') || lowerName.includes('purse')) {
    const bagTypes = ['Handbag', 'Purse', 'Tote Bag', 'Clutch', 'Backpack', 'Shoulder Bag']
    const randomType = bagTypes[Math.floor(Math.random() * bagTypes.length)]
    return {
      category: 'clothing',
      name: `Designer ${randomType}`,
      price: Math.floor(Math.random() * 10000) + 2000,
      description: `Premium quality ${randomType.toLowerCase()} made from finest materials.`,
    }
  }
  
  // Sports items
  if (lowerName.includes('product-cover') || lowerName.includes('sports')) {
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
      description: 'Professional sports equipment for fitness enthusiasts.',
    }
  }
  
  // Home & Living
  if (lowerName.includes('last') || lowerName.includes('home') || lowerName.includes('decor')) {
    return {
      category: 'home',
      name: 'Premium Home Decor Item',
      price: Math.floor(Math.random() * 8000) + 3000,
      description: 'Beautiful home decor item to enhance your living space.',
    }
  }
  
  // New arrivals
  if (lowerName.includes('new')) {
    const newItems = [
      { name: 'Premium Headphones', price: 14999, category: 'electronics' },
      { name: 'Wireless Earbuds Pro', price: 8999, category: 'electronics' },
      { name: 'Smart Speaker', price: 6999, category: 'electronics' },
      { name: 'Portable Bluetooth Speaker', price: 3499, category: 'electronics' },
    ]
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)]
    return {
      category: randomItem.category,
      name: randomItem.name,
      price: randomItem.price,
      description: 'Latest electronic gadget with premium features.',
    }
  }
  
  // Car accessories
  if (lowerName.includes('car')) {
    return {
      category: 'other',
      name: 'Premium Car Accessory',
      price: 2499,
      description: 'High-quality car accessory for modern vehicles.',
    }
  }
  
  // Couple items
  if (lowerName.includes('couple')) {
    return {
      category: 'other',
      name: 'Couple Gift Set',
      price: 4999,
      description: 'Special gift set perfect for couples.',
    }
  }
  
  // Shop/Store items
  if (lowerName.includes('shop') || lowerName.includes('store')) {
    return {
      category: 'other',
      name: 'Premium Store Item',
      price: Math.floor(Math.random() * 5000) + 1999,
      description: 'Quality product from our store collection.',
    }
  }
  
  // User/Profile images - skip these
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('picme') || lowerName.includes('picyou')) {
    return {
      category: 'other',
      name: 'Skip',
      price: 0,
      description: '',
    }
  }
  
  // Default - Fashion/Lifestyle
  return {
    category: 'clothing',
    name: `Fashion Item ${filename.replace(/[\d\-.\s]/g, '').substring(0, 20)}`,
    price: Math.floor(Math.random() * 5000) + 999,
    description: 'Trendy fashion item for modern lifestyle.',
  }
}

// List of image extensions to process
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif']

// Files to skip
const skipFiles = [
  'user.png', 'user1.png', 'user3.png',
  'picme.jpg.jpg', 'picyou.jpg',
  'fa-brands-2.png', 'fa-brands-3.png', 'fa-brands-4.png', 
  'fa-brands-5.png', 'fa-brands-6.png',
  'file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg',
  'container (1).png', 'row.png', 'row (1).png', 'row (2).png', 'row (5).png',
  'card-item (4).png', 'card-item (5).png', 'card-item (6).png',
  'card-item (7).png', 'card-item (8).png', 'card-item (9).png', 'card-item (10).png',
  'carousel-inner (1).png', 'carousel-inner.png',
  'copyshop.jpg', 'garid.png', 'ki.png', 'road.jpg', 'shop.jpg', 'shop1.jpg',
  'col.jpg', 'col1.jpg', 'col2.jpg', 'col3.jpg', 'col4.jpg',
  'background (3).png', 'bg43.png', 'bgvideo.png',
  'client.jpg', 'abbas.png', 'amrela.jpg', 'arman.png', 'ayan.png', 'waqas.png'
]

export async function GET() {
  // Disable during build/static generation
  const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.SEED_ENABLED;
  
  if (isBuildTime) {
    return NextResponse.json(
      {
        success: false,
        message: 'Seed endpoint is disabled during production build. Set SEED_ENABLED=true to enable.',
      },
      { status: 403 }
    );
  }

  try {
    const publicDir = path.join(process.cwd(), 'public')
    
    // Read all files from public directory
    const files = await fs.readdir(publicDir)
    
    // Filter only image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext) && !skipFiles.includes(file)
    })
    
    let created = 0
    let skipped = 0
    let errors = 0
    
    for (const filename of imageFiles) {
      try {
        const imagePath = `/${filename}`
        const productInfo = categorizeImage(filename)
        
        // Skip if categorization says to skip
        if (productInfo.name === 'Skip') {
          skipped++
          continue
        }
        
        const slug = productInfo.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)
        
        // Check if product already exists
        const existingProduct = await sanityClient.fetch(
          `*[_type == "product" && publicImagePath == $imagePath][0]`,
          { imagePath }
        )
        
        if (!existingProduct) {
          await sanityClient.create({
            _type: 'product',
            name: productInfo.name,
            slug: {
              _type: 'slug',
              current: slug,
            },
            description: productInfo.description,
            price: productInfo.price,
            originalPrice: Math.floor(productInfo.price * 1.3),
            publicImagePath: imagePath,
            category: productInfo.category,
            stock: Math.floor(Math.random() * 100) + 20,
            featured: Math.random() > 0.5,
            rating: Number((Math.random() * 2 + 3).toFixed(1)),
            reviewCount: Math.floor(Math.random() * 500),
          })
          created++
          console.log(`Created product: ${productInfo.name} from ${filename}`)
        } else {
          skipped++
          console.log(`Skipped (already exists): ${filename}`)
        }
      } catch (error) {
        errors++
        console.error(`Error processing ${filename}:`, error)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${imageFiles.length} images`,
      created,
      skipped,
      errors,
      totalImages: imageFiles.length,
    })
  } catch (error) {
    console.error('Error seeding products:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
