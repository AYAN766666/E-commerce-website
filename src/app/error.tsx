'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, RefreshCcw, ShoppingCart, Bug } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl w-full"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            We&apos;re sorry, but an unexpected error occurred. Don&apos;t worry, our team has been notified.
          </p>
          
          {/* Error Details (Development Mode) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-100 rounded-xl p-4 mb-6 text-left"
            >
              <div className="flex items-start">
                <Bug className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-700 mb-1">Error Details:</p>
                  <code className="text-xs text-red-600 break-all">{error.message}</code>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button
            onClick={reset}
            className="aurora-btn inline-flex items-center px-6 py-3 text-lg"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link href="/">
            <button className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
          </Link>
        </motion.div>

        {/* Shop Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-6 h-6 text-aurora-primary mr-2" />
            <span className="font-semibold text-gray-700">Continue Shopping</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Browse our latest products while we fix this issue
          </p>
          <Link 
            href="/shop"
            className="text-aurora-primary hover:text-aurora-secondary font-semibold transition-colors"
          >
            Visit Shop →
          </Link>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p className="mb-2">Still having issues?</p>
          <Link 
            href="/contact"
            className="text-aurora-primary hover:text-aurora-secondary font-semibold transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
