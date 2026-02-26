'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiDownload, FiHome } from 'react-icons/fi';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  customer: any;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderData = localStorage.getItem(`order-${params.orderId}`);
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
    setLoading(false);
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-8">Order not found</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              <FiHome className="w-5 h-5" />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FiCheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. We're preparing your groceries.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Order Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-lg font-semibold text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString('en-KE')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {deliveryDate.toLocaleDateString('en-KE')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {order.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery'}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {order.customer.address}, {order.customer.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{order.customer.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    KES {item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
              <span>Total Amount</span>
              <span className="text-green-600">KES {order.total}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4">What's Next?</h2>
          <ul className="space-y-3 text-blue-900">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>We'll confirm your order within 1 hour</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>You'll receive an SMS with tracking details</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>Your order will be delivered within 2 days</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>You can track your order in real-time</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
            <FiDownload className="w-5 h-5" />
            Download Receipt
          </button>
          <Link
            href="/shop"
            className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <FiHome className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 text-center text-gray-600">
          <p>Have questions? Contact us at <a href="mailto:support@hallofresh.co.ke" className="text-green-600 hover:underline">support@hallofresh.co.ke</a></p>
          <p>or call <a href="tel:+254712345678" className="text-green-600 hover:underline">+254 712 345 678</a></p>
        </div>
      </div>
    </div>
  );
}
