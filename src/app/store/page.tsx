'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  Globe,
  Package,
  Truck,
  Award,
  Heart,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const storeInfo = {
  name: 'Bhoot Barhi E-Commerce',
  address: 'Shop #123, Commerce Plaza, Main Street, Karachi, Pakistan',
  phone: '03198130598',
  email: '03198130598',
  hours: {
    weekdays: '9:00 AM - 10:00 PM',
    saturday: '10:00 AM - 11:00 PM',
    sunday: '11:00 AM - 9:00 PM',
  },
};

const features = [
  {
    icon: Package,
    title: 'Quality Products',
    description: 'Carefully selected premium products',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery available',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Award,
    title: 'Trusted Seller',
    description: '1000+ happy customers',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: '24/7 customer support',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function StoreDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aurora-light to-white">
      {/* Header */}
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
          <Link href="/">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>
          </Link>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Our <span className="aurora-text">Store</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Visit us or get in touch - we&apos;d love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-6 shadow-xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-black mb-8">
                  <span className="aurora-text">Contact</span> Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Store Address</h3>
                      <p className="text-gray-600">{storeInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                      <p className="text-gray-600">{storeInfo.phone}</p>
                      <a href="tel:+923198130598" className="text-aurora-primary hover:underline text-sm">
                        Call Now
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Address</h3>
                      <p className="text-gray-600">{storeInfo.email}</p>
                      <a href="mailto:03198130598" className="text-aurora-primary hover:underline text-sm">
                        Send Email
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                      <div className="space-y-1 text-gray-600">
                        <p>Mon - Fri: {storeInfo.hours.weekdays}</p>
                        <p>Saturday: {storeInfo.hours.saturday}</p>
                        <p>Sunday: {storeInfo.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Follow Us on Social Media</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Share2, label: 'Share', color: 'from-blue-600 to-blue-700' },
                    { icon: Globe, label: 'Website', color: 'from-pink-500 to-purple-600' },
                    { icon: Mail, label: 'Email', color: 'from-blue-400 to-blue-600' },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href="#"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg`}
                    >
                      <social.icon className="w-7 h-7 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map / Location */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-black mb-6">
                  Store <span className="aurora-text">Location</span>
                </h2>

                {/* Map Placeholder */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-aurora-primary mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold">Visit Our Store</p>
                      <p className="text-gray-500 text-sm mt-1">{storeInfo.address}</p>
                    </div>
                  </div>
                  {/* Decorative Map Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300">
                    <path d="M0,100 Q100,50 200,100 T400,100" stroke="#6366f1" fill="none" strokeWidth="2" />
                    <path d="M0,150 Q100,100 200,150 T400,150" stroke="#14b8a6" fill="none" strokeWidth="2" />
                    <path d="M0,200 Q100,150 200,200 T400,200" stroke="#f472b6" fill="none" strokeWidth="2" />
                  </svg>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Store ID</span>
                    <span className="font-bold text-aurora-primary">#BB-u9ap71p1</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Established</span>
                    <span className="font-bold text-aurora-primary">2024</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-bold text-aurora-primary">1,000+</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-aurora-gradient-1 via-aurora-gradient-2 to-aurora-gradient-3 rounded-3xl p-8 shadow-lg text-white">
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all"
                    >
                      Browse Products
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all"
                    >
                      Contact Support
                    </motion.button>
                  </Link>
                  <Link href="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-white text-aurora-primary rounded-xl font-semibold hover:bg-white/90 transition-all"
                    >
                      Track Order
                    </motion.button>
                  </Link>
                  <a href="tel:+923198130598">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-white text-aurora-primary rounded-xl font-semibold hover:bg-white/90 transition-all"
                    >
                      Call Now
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
