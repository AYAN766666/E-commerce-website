'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone, Share2, Globe } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Store Info', href: '/store' },
    { name: 'Deals', href: '/shop' },
  ],
  company: [
    { name: 'About Us', href: '/store' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/contact#faq' },
    { name: 'Reviews', href: '/shop' },
  ],
  support: [
    { name: 'Help Center', href: '/contact' },
    { name: 'Shipping Info', href: '/contact' },
    { name: 'Returns', href: '/contact' },
    { name: 'Track Order', href: '/checkout' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/contact' },
    { name: 'Terms of Service', href: '/contact' },
    { name: 'Refund Policy', href: '/contact' },
  ],
  admin: [
    { name: 'Admin Panel', href: '/admin' },
    { name: 'Sanity Studio', href: 'https://www.sanity.io/studio', external: true },
  ],
};

const socialLinks = [
  { icon: Share2, href: '#', label: 'Share' },
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Phone, href: '#', label: 'Phone' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-aurora-dark via-aurora-primary/20 to-aurora-gradient-3/20 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-aurora-gradient-1 via-aurora-gradient-2 to-aurora-gradient-3 flex items-center justify-center shadow-glow"
              >
                <span className="text-white font-bold text-2xl">B</span>
              </motion.div>
              <span className="text-2xl font-bold aurora-text">Bhoot Barhi</span>
            </Link>
            <p className="text-white/60 text-lg leading-relaxed">
              Your one-stop destination for premium products at unbeatable prices. 
              Experience the future of shopping today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-aurora-gradient-1 hover:to-aurora-gradient-3 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-aurora-gradient-2 flex-shrink-0 mt-1" />
                <span className="text-white/60">
                  Shop #123, Commerce Plaza,<br />
                  Main Street, Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-aurora-gradient-2 flex-shrink-0" />
                <span className="text-white/60">03198130598</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-aurora-gradient-2 flex-shrink-0" />
                <span className="text-white/60">03198130598</span>
              </li>
            </ul>
          </div>

          {/* Admin Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Admin</h4>
            <ul className="space-y-3">
              {footerLinks.admin.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bhoot Barhi. Made with{' '}
              <Heart className="w-4 h-4 inline text-red-500 fill-red-500" /> by Team Bhoot Barhi
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
