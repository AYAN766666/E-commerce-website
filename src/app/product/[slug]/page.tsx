'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RefreshCcw,
  Minus,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { useCartStore } from '@/lib/local-orders';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { fallbackProducts } from '@/lib/local-products';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  publicImagePath?: string;
  imageUrl?: string;
  images?: unknown[];
  category: string;
  rating?: number;
  reviewCount?: number;
  stock: number;
  featured: boolean;
  description?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const slugParam = params.slug as string;
      // Find product from local products
      const foundProduct = fallbackProducts.find(
        (p) => {
          if (typeof p.slug === 'string') {
            return p.slug === slugParam;
          }
          return false;
        }
      );
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aurora-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    window.location.href = '/product/not-found';
    return null;
  }

  // Now product is guaranteed to be non-null in the rest of the component
  // Get images array - prioritize publicImagePath, then imageUrl, then images
  const images: string[] = product.publicImagePath
    ? [product.publicImagePath]
    : product.imageUrl
    ? [product.imageUrl]
    : product.images && Array.isArray(product.images)
    ? product.images as string[]
    : [];

  const currentImage: string = images[selectedImage] || '/placeholder.jpg';

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: currentImage,
      slug: params.slug as string,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/shop">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-aurora-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {discount > 0 && (
                  <span className="absolute top-4 left-4 badge-sale">
                    -{discount}%
                  </span>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </motion.button>
              </motion.div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-aurora-primary'
                          : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1} of ${product.name}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <span className="text-aurora-primary font-semibold text-sm uppercase tracking-wider">
                {product.category}
              </span>

              <h1 className="text-4xl font-black text-gray-900">{product.name}</h1>

              {product.rating && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold aurora-text">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="badge-sale">Save {discount}%</span>
                  </>
                )}
              </div>

              {product.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              )}

              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                    product.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : isAdding
                      ? 'bg-green-500 text-white'
                      : 'aurora-btn'
                  }`}
                >
                  {isAdding ? (
                    <span>Added to Cart!</span>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-8 h-8 text-aurora-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Free Shipping</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-8 h-8 text-aurora-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Secure Payment</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <RefreshCcw className="w-8 h-8 text-aurora-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
