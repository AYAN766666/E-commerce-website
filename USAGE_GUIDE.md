# Bhoot Barhi E-Commerce - Setup & Usage Guide

## ✅ What's Been Done

### 1. **Public Folder Images Support**
Your e-commerce site now supports using images directly from your `public/` folder for products!

**How to add products with public folder images:**

1. Go to the admin panel: `http://localhost:3000/admin`
2. Click "Seed All Products" to automatically create products with your public folder images
3. OR manually add products in Sanity Studio with the `publicImagePath` field

**Example public image paths:**
- `/laptop1.png`
- `/pic.jpg`
- `/laptop3.jpg`
- Any image in your `public/` folder

### 2. **Cash on Delivery (COD) Only**
All online payment options have been removed. Now only **Cash on Delivery** is available!

**Features:**
- ✅ Beautiful animated COD payment section
- ✅ Clear messaging that only COD is available
- ✅ Trust badges showing Free Shipping, Easy Returns, and Secure checkout
- ✅ No card payment fields to fill
- ✅ Faster checkout process

### 3. **Enhanced Animations**
The checkout page now has beautiful animations:
- ✅ Animated header
- ✅ Smooth payment section transitions
- ✅ Animated features grid
- ✅ Success animations on order placement

---

## 🚀 How to Use

### Step 1: Start the Development Server
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

### Step 2: Add Products to Sanity

**Option A: Auto-Seed Products (Recommended)**
1. Go to `http://localhost:3000/admin`
2. Click "Seed All Products" button
3. This will create 16 products using your public folder images

**Option B: Manual Product Addition**
1. Go to Sanity Studio: [https://www.sanity.io/studio](https://www.sanity.io/studio)
2. Navigate to "Products"
3. Click "Create new product"
4. Fill in the details:
   - **Product Name**: e.g., "Premium Laptop"
   - **Slug**: auto-generated
   - **Price**: e.g., 89999
   - **Public Image Path**: `/laptop1.png` (path to your public folder image)
   - **Category**: electronics, clothing, sports, home, etc.
   - **Stock**: quantity available
   - **Featured**: check if you want it on homepage

### Step 3: Test the Checkout Flow

1. **Browse Products**: Go to `/shop`
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in header
4. **Checkout**: Click "Checkout"
5. **Fill Shipping Details**:
   - First Name, Last Name
   - Email, Phone
   - Address, City, State, Pincode
   - **Validate Pincode** (click the search icon)
6. **Payment**: Only Cash on Delivery option (no form to fill!)
7. **Place Order**: Click "Place Order"
8. **Success**: See order confirmation with order number

---

## 📁 Public Folder Images

Your `public/` folder already has many images. Here are the ones configured for products:

### Laptop Images:
- `/laptop1.png` - Premium Laptop Pro
- `/laptop2.png` - UltraBook Air
- `/laptop3.jpg` - Gaming Laptop X
- `/laptop4.png` - Business Laptop Elite

### Clothing Images:
- `/pic.jpg` - Classic Denim Jacket
- `/pic1.jpg` - Urban Style Jacket
- `/pic2.jpg` - Winter Parka
- `/pic3.jpg` - Casual Hoodie
- `/pic4.jpg` - Summer Breeze Shirt
- `/pic5.jpg` - Elegant Evening Dress
- `/pic6.jpg` - Casual Friday Wear
- `/pic7.jpg` - Weekender Outfit

### Home Decor Images:
- `/new.jpg` - Abstract Art Print
- `/new1.jpg` - Modern Wall Decor
- `/new2.jpg` - Vintage Poster
- `/new3.jpg` - Minimalist Art

**You can add more images to the `public/` folder and update the seed file!**

---

## 🛠️ Technical Details

### Files Modified:
1. **`sanity/schemas/index.ts`** - Added `publicImagePath` field to product schema
2. **`src/app/checkout/page.tsx`** - Removed card payment, enhanced COD with animations
3. **`src/components/ProductCard.tsx`** - Added publicImagePath support
4. **`src/app/product/[slug]/page.tsx`** - Added publicImagePath support
5. **`src/components/FeaturedProducts.tsx`** - Updated query to include publicImagePath
6. **`src/app/shop/page.tsx`** - Updated query to include publicImagePath
7. **`src/lib/sanity.ts`** - Updated helper functions to prioritize publicImagePath
8. **`src/lib/public-folder-seed.ts`** - NEW: Product data for public folder images
9. **`src/app/api/seed/route.ts`** - Updated to use public folder seed data

### Image Priority:
The system checks for product images in this order:
1. **`publicImagePath`** - Path to public folder image (e.g., `/laptop1.png`)
2. **`imageUrl`** - External URL (e.g., Unsplash)
3. **`images`** - Sanity CMS uploaded images

---

## 🎯 Features

### ✅ Working Features:
- ✅ Product listing with images from public folder
- ✅ Product detail page with image gallery
- ✅ Add to cart functionality
- ✅ Cart drawer with animations
- ✅ Checkout with COD only
- ✅ Pincode validation
- ✅ Order creation in Sanity CMS
- ✅ Beautiful animations throughout
- ✅ Responsive design
- ✅ Featured products on homepage

### 🎨 Animations:
- ✅ Hero section animations
- ✅ Product card hover animations
- ✅ Cart drawer slide-in
- ✅ Checkout form animations
- ✅ Payment section animations
- ✅ Order success animations

---

## 🔧 Customization

### Add More Products:
Edit `src/lib/public-folder-seed.ts` and add new products:

```typescript
{
  name: 'Your Product Name',
  slug: 'your-product-slug',
  description: 'Product description',
  price: 9999,
  originalPrice: 14999,
  publicImagePath: '/your-image.png',
  category: 'electronics',
  stock: 50,
  featured: true,
  rating: 4.5,
  reviewCount: 100,
}
```

### Change COD Message:
Edit `src/app/checkout/page.tsx` and update the payment section text.

### Add More Payment Methods:
Currently only COD is enabled. To add more, you would need to integrate payment gateways like Razorpay, Stripe, etc.

---

## 📝 Important Notes

1. **Images must be in public folder**: Make sure your images are in the `public/` directory
2. **Path format**: Always use forward slash (e.g., `/laptop1.png`, not `laptop1.png`)
3. **Sanity Studio**: Visit [https://www.sanity.io/studio](https://www.sanity.io/studio) to manage products manually
4. **Pincode Validation**: Update `src/lib/pincode-validator.ts` with actual serviceable pincodes

---

## 🐛 Troubleshooting

### Images not showing?
- Check if the image exists in the `public/` folder
- Verify the path starts with `/`
- Clear browser cache

### Products not showing?
- Run the seed script from `/admin`
- Check Sanity Studio to verify products were created
- Refresh the shop page

### Checkout not working?
- Make sure pincode is validated
- Check browser console for errors
- Verify Sanity CMS connection

---

## 📞 Support

For issues or questions:
1. Check the console for errors
2. Verify Sanity CMS connection
3. Ensure all dependencies are installed: `npm install`

---

**Happy Selling! 🎉**
