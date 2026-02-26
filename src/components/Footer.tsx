'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hallo Fresh</h3>
            <p className="text-sm">
              Your trusted grocery delivery service in Eastleigh, Nairobi. Fresh products delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=vegetables" className="hover:text-white transition">Vegetables</Link></li>
              <li><Link href="/shop?category=fruits" className="hover:text-white transition">Fruits</Link></li>
              <li><Link href="/shop?category=dairy" className="hover:text-white transition">Dairy</Link></li>
              <li><Link href="/shop?category=meat" className="hover:text-white transition">Meat</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <a href="tel:+254712345678" className="hover:text-white transition">+254 712 345 678</a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <a href="mailto:info@hallofresh.co.ke" className="hover:text-white transition">info@hallofresh.co.ke</a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 mt-1" />
                <span>Eastleigh, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-white transition">
              <FiFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Hallo Fresh Grocery. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-white transition">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
