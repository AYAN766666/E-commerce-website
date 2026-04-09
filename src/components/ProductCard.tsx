'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/local-orders';
import Link from 'next/link';
import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  slug: string | { current: string };
  price: number;
  originalPrice?: number;
  images?: unknown[];
  imageUrl?: string;
  publicImagePath?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Get product image - prioritize publicImagePath, then imageUrl, then images array
  const getProductImage = () => {
    // First check for public folder image path
    if (product.publicImagePath) {
      return product.publicImagePath;
    }
    // Then check for external imageUrl
    if (product.imageUrl) {
      return product.imageUrl;
    }
    // Then check images array from Sanity
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
      if (firstImage && typeof firstImage === 'object' && 'asset' in firstImage && firstImage.asset && typeof firstImage.asset === 'object' && '_ref' in firstImage.asset) {
        const asset = (firstImage.asset as { _ref: string })._ref;
        const [, id, filename] = asset.split('-');
        const extension = filename?.split('.').pop() || 'jpg';
        return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}.${extension}`;
      }
    }
    return '/placeholder.jpg';
  };

  const productImage = getProductImage();

  // Get slug value - handle both string and object
  const slugValue = typeof product.slug === 'string' ? product.slug : product.slug.current;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: productImage,
      slug: slugValue,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="product-card group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-glow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-aurora-light to-aurora-primary/10">
        <Link href={`/product/${slugValue}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <span className="badge-sale">-{discount}%</span>
          )}
          {product.featured && (
            <span className="badge-featured">Featured</span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </motion.button>

        {/* Quick Add to Cart */}
        <motion.div
          initial={{ y: 100 }}
          whileHover={{ y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
              product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-green-500 text-white'
                : 'aurora-btn'
            }`}
          >
            {isAdding ? (
              <>
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <span className="text-xs font-semibold text-aurora-primary uppercase tracking-wider">
          {product.category || 'General'}
        </span>

        {/* Product Name */}
        <Link href={`/product/${slugValue}`}>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 hover:text-aurora-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold aurora-text">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
