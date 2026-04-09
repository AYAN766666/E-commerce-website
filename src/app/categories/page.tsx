'use client';

import { motion } from 'framer-motion';
import { Smartphone, Laptop, Shirt, Home, Book, Dumbbell, Sparkles, Package } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and devices',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500',
    products: 1250,
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion for everyone',
    icon: Shirt,
    gradient: 'from-purple-500 to-pink-500',
    products: 2340,
  },
  {
    name: 'Home & Living',
    slug: 'home',
    description: 'Make your house a home',
    icon: Home,
    gradient: 'from-orange-500 to-red-500',
    products: 890,
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Gear up for success',
    icon: Dumbbell,
    gradient: 'from-green-500 to-emerald-500',
    products: 567,
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Knowledge is power',
    icon: Book,
    gradient: 'from-amber-500 to-orange-500',
    products: 3420,
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    description: 'Look your best',
    icon: Sparkles,
    gradient: 'from-pink-500 to-rose-500',
    products: 1120,
  },
  {
    name: 'Toys',
    slug: 'toys',
    description: 'Fun for all ages',
    icon: Package,
    gradient: 'from-indigo-500 to-purple-500',
    products: 780,
  },
  {
    name: 'Other',
    slug: 'other',
    description: 'Discover more',
    icon: Laptop,
    gradient: 'from-teal-500 to-cyan-500',
    products: 450,
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white">
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-aurora-dark via-aurora-primary/20 to-aurora-gradient-3/20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-aurora-gradient-1/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-aurora-gradient-2/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Browse by <span className="aurora-text">Category</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Find exactly what you&apos;re looking for in our curated categories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop?category=${category.slug}`}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-glow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-glow`}
                    >
                      <category.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-aurora-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-aurora-primary">
                        {category.products.toLocaleString()} products
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-aurora-gradient-1 via-aurora-gradient-2 to-aurora-gradient-3 p-12 text-center"
          >
            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Can&apos;t Decide?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Check out our featured products and best sellers to find the perfect item for you.
              </p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-aurora-primary rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  View All Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
