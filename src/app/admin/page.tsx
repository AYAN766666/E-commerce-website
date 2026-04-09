'use client';

import { motion } from 'framer-motion';
import { Image as ImageIcon, ShoppingCart, Package, TrendingUp, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOrderStore } from '@/lib/local-orders';
import { fallbackProducts } from '@/lib/local-products';

export default function AdminDashboard() {
  const router = useRouter();
  const { orders } = useOrderStore();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const totalProducts = fallbackProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              Admin <span className="aurora-text">Dashboard</span>
            </h1>
            <p className="text-gray-600">Manage your e-commerce store - 100% Local, No Database!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
                <ImageIcon className="w-8 h-8 text-aurora-primary" />
              <span className="text-3xl font-bold text-gray-900">{totalProducts}</span>
            </div>
            <p className="text-gray-600">Total Products</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{orders.length}</span>
            </div>
            <p className="text-gray-600">Total Orders</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-600">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">
                {orders.filter((o) => o.orderStatus === 'processing').length}
              </span>
            </div>
            <p className="text-gray-600">Pending Orders</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/shop">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-aurora-gradient-1 to-aurora-gradient-2 rounded-2xl p-8 shadow-lg cursor-pointer"
            >
              <ShoppingCart className="w-16 h-16 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Visit Shop</h3>
              <p className="text-white/80">Browse all {totalProducts} products from public folder</p>
            </motion.div>
          </Link>

          <Link href="/admin/orders">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 shadow-lg cursor-pointer"
            >
              <Package className="w-16 h-16 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">View Orders</h3>
              <p className="text-white/80">Manage {orders.length} customer orders</p>
            </motion.div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Public Folder Products</h3>
                <p className="text-gray-600 text-sm">All products loaded from /public folder images. No database needed!</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Shopping Cart</h3>
                <p className="text-gray-600 text-sm">Add to cart, update quantities, persistent cart storage.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Cash on Delivery</h3>
                <p className="text-gray-600 text-sm">100% COD checkout with complete address form.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Local Storage Orders</h3>
                <p className="text-gray-600 text-sm">All orders saved locally in browser. View in admin panel.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Product Categories</h3>
                <p className="text-gray-600 text-sm">Auto-categorized: Electronics, Clothing, Sports, Home & more.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Mobile Responsive</h3>
                <p className="text-gray-600 text-sm">Beautiful design that works on all devices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Preview */}
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products from Public Folder</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {fallbackProducts.slice(0, 6).map((product) => (
              <div key={product._id} className="text-center">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.publicImagePath}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">₹{product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/shop" className="aurora-btn inline-flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View All {totalProducts} Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
