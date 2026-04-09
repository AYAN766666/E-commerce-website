# 🛍️ Complete E-Commerce Store with Sanity CMS

A modern, fully-functional e-commerce store built with Next.js 14, Sanity CMS, and Tailwind CSS.

## ✨ Features

### 🎯 Core Features
- **Product Management** - Full CRUD via Sanity CMS
- **Shopping Cart** - Persistent cart with Zustand
- **Checkout System** - Complete checkout with form validation
- **Cash on Delivery** - Local payment method ready
- **Order Tracking** - All orders saved to Sanity CMS
- **Pincode Validation** - Check delivery availability

### 🎨 Design Features
- Beautiful gradient UI with Aurora theme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Modern product cards and layouts

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Make sure `.env.local` has your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=u9ap71p1
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Start Development Server
```bash
npm run dev
```

Your app will be running at `http://localhost:3000`

## 📦 Adding Products to Sanity

### Method 1: Using the Admin Page (Easiest)

1. Start the dev server: `npm run dev`
2. Go to: `http://localhost:3000/admin`
3. Click **"Seed All Products"** button
4. Wait for confirmation message
5. Visit `/shop` to see products

### Method 2: Manually via Sanity Studio

1. Go to [Sanity Studio](https://www.sanity.io/studio)
2. Login with your credentials
3. Click on **"Products"** in the sidebar
4. Click **"Add Product"**
5. Fill in the details:
   - Name
   - Slug (auto-generated from name)
   - Price
   - Original Price (optional, for discounts)
   - Image URL (use external URLs for testing)
   - Category
   - Stock
   - Featured (checkbox)
   - Rating & Reviews
6. Click **Publish**

## 🧪 Testing the Complete Flow

### 1. Add Products
- Visit `/admin` and seed products, OR
- Add products manually in Sanity Studio

### 2. Browse Products
- Visit `/shop` to see all products
- Filter by category and price
- Click on a product to view details

### 3. Add to Cart
- Click "Add to Cart" on any product
- View cart by clicking the cart icon in header

### 4. Checkout
- Go to `/checkout`
- **Enter Pincode** (e.g., `400001` for Mumbai)
- Click the search icon to validate
- Fill in customer details:
  - Name, Email, Phone
  - Address, City, State
- Select **Cash on Delivery**
- Click "Place Order"

### 5. View Orders
- Orders are saved in Sanity CMS
- Visit Sanity Studio to view all orders
- Orders show: customer info, items, total, status

## 📁 Project Structure

```
E:\comerce\
├── src/
│   ├── app/
│   │   ├── admin/          # Admin page to seed products
│   │   ├── checkout/       # Checkout page with pincode validation
│   │   ├── product/[slug]/ # Product detail page
│   │   ├── shop/           # Shop page with filters
│   │   └── api/seed/       # API route to seed products
│   ├── components/
│   │   ├── CartDrawer.tsx  # Shopping cart sidebar
│   │   ├── FeaturedProducts.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── cart-store.ts   # Zustand cart state
│       ├── sanity.ts       # Sanity client
│       ├── pincode-validator.ts
│       └── seed-products.ts
├── sanity/
│   ├── schemas/
│   │   └── index.ts        # Product & Order schemas
│   └── structure.ts        # Sanity Studio structure
└── sanity.config.ts        # Sanity configuration
```

## 🛠️ Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured products |
| Shop | `/shop` | All products with filters |
| Product Detail | `/product/[slug]` | Individual product page |
| Cart | Header icon | Shopping cart drawer |
| Checkout | `/checkout` | Order placement with pincode check |
| Admin | `/admin` | Seed products to Sanity |

## 🎯 Pincode Service Areas

Currently configured for:
- **Mumbai** (400001-400099)
- **Delhi** (110001-110096)
- **Bangalore** (560001-560100)
- **Pune** (411001-411061)

Edit `src/lib/pincode-validator.ts` to add more areas.

## 💳 Payment Methods

### Cash on Delivery (COD)
- Enabled by default
- No advance payment required
- Perfect for testing and local markets

### Card Payment
- UI ready (requires payment gateway integration)
- Can be integrated with Razorpay, Stripe, etc.

## 🔧 Customization

### Add More Products
Edit `src/lib/seed-products.ts` and add your products:

```typescript
{
  name: 'Product Name',
  slug: 'product-slug',
  description: 'Product description',
  price: 999,
  originalPrice: 1499,
  image: 'https://image-url.com/image.jpg',
  category: 'electronics', // electronics, clothing, sports, etc.
  stock: 50,
  featured: true,
  rating: 4.5,
  reviewCount: 100,
}
```

### Change Theme Colors
Edit `tailwind.config.ts` to change the Aurora theme colors.

### Add More Categories
Edit `sanity/schemas/index.ts` in the product schema.

## 📊 Sanity CMS Schemas

### Product Schema
- Name, Slug, Description
- Price, Original Price
- Images (Sanity assets or external URLs)
- Category, Stock, Featured
- Rating, Review Count

### Order Schema
- Order Number (auto-generated)
- Customer Details (name, email, phone)
- Shipping Address (with pincode)
- Order Items
- Payment Method & Status
- Order Status
- Total Amount

## 🐛 Troubleshooting

### Products not showing?
1. Make sure products are seeded/created in Sanity
2. Check console for errors
3. Verify Sanity project ID in `.env.local`

### Order not placing?
1. Validate pincode first
2. Check all required fields are filled
3. Check browser console for errors
4. Verify Sanity connection

### Images not loading?
- For external URLs, make sure they're valid
- For Sanity images, ensure they're uploaded properly

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📝 Next Steps

1. **Add more payment methods** (Razorpay, Stripe)
2. **Email notifications** on order placement
3. **Order tracking** page for customers
4. **User authentication** for saved addresses
5. **Product reviews** system
6. **Wishlist** functionality
7. **Search** functionality

## 🎉 You're All Set!

Your complete e-commerce store is ready for testing:
- ✅ Products from Sanity CMS
- ✅ Working shopping cart
- ✅ Pincode validation
- ✅ Cash on Delivery
- ✅ Orders saved to Sanity
- ✅ Beautiful, responsive UI

Start by visiting `/admin` to seed products, then test the complete flow!

---

**Built with:** Next.js 14, Sanity CMS, Tailwind CSS, Framer Motion, Zustand
