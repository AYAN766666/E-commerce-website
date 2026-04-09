'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { fallbackProducts } from '@/lib/local-products';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images?: unknown[];
  imageUrl?: string;
  publicImagePath?: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  stock: number;
  featured: boolean;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load featured products from local file (no Sanity needed!)
    const featured = fallbackProducts.filter(p => p.featured).slice(0, 4);
    setProducts(featured);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aurora-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-aurora-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Featured <span className="aurora-text">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of our best products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aurora-btn inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
