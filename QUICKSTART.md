# Hallo Fresh Grocery - Quick Start Guide

Get up and running with Hallo Fresh Grocery in 5 minutes!

## 🚀 Quick Setup

### 1. Clone & Install
```bash
git clone https://github.com/Abdullahi0720006477/Hallo-Fresh-Grocery.git
cd Hallo-Fresh-Grocery
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
- Firebase credentials (from Firebase Console)
- M-Pesa credentials (from Safaricom Daraja)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Key Features to Try

### 1. Browse Products
- Visit `/shop` to see all products
- Filter by category, price, and rating
- Search for specific items

### 2. Add to Cart
- Click "Add to Cart" on any product
- Adjust quantity using +/- buttons
- View cart at `/cart`

### 3. Checkout
- Go to `/checkout`
- Enter delivery details
- Choose payment method (M-Pesa or Cash on Delivery)
- Complete order

### 4. Order Confirmation
- View order details
- Get order number and tracking info
- Download receipt (coming soon)

---

## 🔐 Firebase Setup (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Copy credentials to `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 💳 M-Pesa Setup (3 minutes)

1. Go to [Safaricom Daraja](https://developer.safaricom.co.ke/)
2. Sign up for an account
3. Create an application
4. Copy credentials to `.env.local`

```env
NEXT_PUBLIC_MPESA_CONSUMER_KEY=your_key
NEXT_PUBLIC_MPESA_CONSUMER_SECRET=your_secret
NEXT_PUBLIC_MPESA_BUSINESS_SHORT_CODE=174379
NEXT_PUBLIC_MPESA_PASSKEY=your_passkey
NEXT_PUBLIC_MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
NEXT_PUBLIC_MPESA_ENVIRONMENT=sandbox
```

**Test with:**
- Phone: `254708374149`
- Amount: Any amount
- PIN: `1234`

---

## 📁 Project Structure

```
src/
├── app/              # Pages and routes
├── components/       # Reusable components
├── data/            # Product data
├── services/        # API services
├── store/           # State management
├── hooks/           # Custom hooks
├── lib/             # Utilities
└── types/           # TypeScript types
```

---

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Safaricom Daraja API](https://developer.safaricom.co.ke/)

---

## 🆘 Common Issues

### Port 3000 Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection Error
- Check `.env.local` credentials
- Verify Firebase project is active
- Check network connectivity

### M-Pesa Payment Not Working
- Verify phone number format (254XXXXXXXXX)
- Check API credentials
- Use sandbox environment for testing

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

---

## 📞 Support

- **Email**: support@hallofresh.co.ke
- **Phone**: +254 712 345 678
- **GitHub Issues**: Create an issue on GitHub

---

## 🎉 You're Ready!

Your Hallo Fresh Grocery app is now running. Start exploring and building!

**Happy coding! 🚀**
