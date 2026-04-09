'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <p className="text-gray-500">
            Check out our other products instead!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/shop">
            <button className="aurora-btn inline-flex items-center px-6 py-3 text-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Shop
            </button>
          </Link>
          
          <Link href="/">
            <button className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
          </Link>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <button 
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-aurora-primary font-medium transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
