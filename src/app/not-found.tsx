'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-br from-aurora-primary to-aurora-secondary leading-none">
              404
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8"
            >
              <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 text-aurora-secondary opacity-50" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>
          <p className="text-gray-500">
            Don&apos;t worry, we&apos;ll help you find your way back!
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link href="/">
            <button className="aurora-btn inline-flex items-center px-6 py-3 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
          </Link>
          
          <Link href="/shop">
            <button className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Shop
            </button>
          </Link>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-aurora-primary mr-2" />
            <span className="font-semibold text-gray-700">Looking for something specific?</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Try searching for products in our shop
          </p>
          <Link 
            href="/shop"
            className="text-aurora-primary hover:text-aurora-secondary font-semibold transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1 rotate-180" />
            Go to Shop
          </Link>
        </motion.div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
        >
          <Link href="/categories" className="hover:text-aurora-primary transition-colors">
            Browse Categories
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-aurora-primary transition-colors">
            Contact Support
          </Link>
          <span>•</span>
          <button 
            onClick={() => window.history.back()}
            className="hover:text-aurora-primary transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
