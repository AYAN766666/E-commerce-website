'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, RefreshCcw, Headphones, CreditCard, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over ₹500',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure transactions',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer support',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: CreditCard,
    title: 'Best Prices',
    description: 'Price match guarantee',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Award,
    title: 'Quality Products',
    description: 'Certified authentic items',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-aurora-dark to-aurora-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-aurora-gradient-2 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 text-white">
            Our <span className="aurora-text">Features</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>

              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
