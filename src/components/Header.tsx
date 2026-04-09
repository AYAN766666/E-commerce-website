'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/local-orders';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalItems = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Store', href: '/store' },
    { name: 'Contact', href: '/contact' },
  ];

  const adminLinks = [
    { name: 'Admin', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark shadow-glow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-gradient-1 via-aurora-gradient-2 to-aurora-gradient-3 flex items-center justify-center shadow-glow"
              >
                <span className="text-white font-bold text-xl">B</span>
              </motion.div>
              <span className="text-xl font-bold aurora-text hidden sm:block">
                Bhoot Barhi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              {/* Admin Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-medium flex items-center">
                  Admin
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-aurora-primary hover:text-white rounded-xl transition-all font-medium first:rounded-t-xl last:rounded-b-xl"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all hidden sm:block"
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              {/* User */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all hidden sm:block"
              >
                <User className="w-5 h-5" />
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-aurora-gradient-3 to-aurora-gradient-1 rounded-full text-xs font-bold flex items-center justify-center text-white shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-20 left-0 right-0 z-40 glass-dark border-b border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-aurora-primary/50 backdrop-blur-sm"
                  autoFocus
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 glass-dark" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 glass-dark border-l border-white/10 p-6">
              <nav className="flex flex-col space-y-2 mt-16">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Admin Section */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="px-4 py-2 text-sm text-white/50 font-semibold">ADMIN</p>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
