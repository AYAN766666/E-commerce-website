'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
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

const categories = ['All', 'Electronics', 'Clothing', 'Sports', 'Home', 'Books', 'Beauty', 'Other'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
  { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
  { label: '₹10000+', min: 10000, max: Infinity },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Load products from local file (no Sanity needed!)
    setProducts(fallbackProducts);
    setLoading(false);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategory === 'All' || 
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const priceMatch =
        product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return parseInt(b._id) - parseInt(a._id);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white">
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-br from-aurora-dark via-aurora-primary/20 to-aurora-gradient-3/20 overflow-hidden">
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
              Our <span className="aurora-text">Shop</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore our complete collection of premium products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden aurora-btn flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <p className="text-gray-600">
            Showing <span className="font-bold text-aurora-primary">{filteredProducts.length}</span> products
          </p>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora-primary/50"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>

            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-aurora-primary text-white'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-aurora-primary text-white'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center space-x-2">
                    <SlidersHorizontal className="w-5 h-5 text-aurora-primary" />
                    <span>Categories</span>
                  </h3>
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="text-xs text-aurora-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category
                          ? 'bg-aurora-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Price Range</h3>
                  {selectedPriceRange.label !== 'All Prices' && (
                    <button
                      onClick={() => setSelectedPriceRange(priceRanges[0])}
                      className="text-xs text-aurora-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedPriceRange.label === range.label
                          ? 'bg-aurora-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-aurora-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center">
                  <X className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                  className="aurora-btn"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
