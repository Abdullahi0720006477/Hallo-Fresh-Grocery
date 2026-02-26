'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiStar } from 'react-icons/fi';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Fresh Groceries Delivered</h1>
              <p className="text-xl text-green-100 mb-8">
                Get fresh, quality groceries delivered to your doorstep in Eastleigh, Nairobi. Fast, reliable, and affordable.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition"
              >
                Shop Now
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1488477181946-6428a0291840?w=600&h=400&fit=crop"
                alt="Fresh Groceries"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <FiTruck className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Delivered within 2 days to your doorstep</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <FiShield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-gray-600">M-Pesa, Cash on Delivery, and more</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <FiClock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Customer support available anytime</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <FiStar className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">Fresh products from trusted vendors</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.name}`}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">{category.icon}</div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/shop" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
            View All
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Rated Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 my-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
          <p className="text-xl mb-8">Get 15% off on your first order with code: FRESH15</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Shop Now
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to get special offers and updates</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
