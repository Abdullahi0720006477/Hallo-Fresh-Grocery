# Hallo Fresh Grocery - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Firebase Configuration](#firebase-configuration)
3. [M-Pesa Integration](#mpesa-integration)
4. [Running the Application](#running-the-application)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: Latest version
- **GitHub Account**: For pushing code
- **Firebase Account**: For backend services
- **Safaricom Daraja Account**: For M-Pesa integration

### Step 1: Clone the Repository

```bash
git clone https://github.com/Abdullahi0720006477/Hallo-Fresh-Grocery.git
cd Hallo-Fresh-Grocery
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16+
- React 19
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios (HTTP Client)
- React Hot Toast (Notifications)
- React Icons
- Firebase SDK

### Step 3: Create Environment Variables File

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials (see sections below).

---

## Firebase Configuration

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `Hallo-Fresh-Grocery`
4. Accept the terms and create the project
5. Wait for the project to be created

### Step 2: Set Up Firebase Services

#### Enable Authentication
1. Go to **Authentication** in the left sidebar
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method (optional)

#### Create Firestore Database
1. Go to **Firestore Database** in the left sidebar
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. Select your region (closest to Kenya: `europe-west1` or `us-central1`)
5. Create the database

#### Create Collections (Optional - for advanced features)
1. Create a `users` collection
2. Create an `orders` collection
3. Create a `products` collection (optional - we use local data)

### Step 3: Get Firebase Credentials

1. Go to **Project Settings** (gear icon)
2. Click on **Your Apps** section
3. Click **Web** to create a web app
4. Copy the Firebase config object
5. Add to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## M-Pesa Integration

### Step 1: Create Safaricom Daraja Account

1. Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke/)
2. Click **Sign Up** and create an account
3. Verify your email
4. Log in to your account

### Step 2: Create an Application

1. Go to **My Applications**
2. Click **Create New Application**
3. Enter application name: `Hallo Fresh Grocery`
4. Select **Sandbox** environment
5. Accept terms and create

### Step 3: Get API Credentials

1. Click on your application
2. You'll see:
   - **Consumer Key**
   - **Consumer Secret**
3. Copy these values

### Step 4: Get Business Short Code and Passkey

1. Go to **Account** settings
2. Look for **Business Short Code** (usually `174379` for sandbox)
3. Generate or copy your **Passkey**
4. Add to `.env.local`:

```env
NEXT_PUBLIC_MPESA_CONSUMER_KEY=your_consumer_key
NEXT_PUBLIC_MPESA_CONSUMER_SECRET=your_consumer_secret
NEXT_PUBLIC_MPESA_BUSINESS_SHORT_CODE=174379
NEXT_PUBLIC_MPESA_PASSKEY=your_passkey
NEXT_PUBLIC_MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
NEXT_PUBLIC_MPESA_ENVIRONMENT=sandbox
```

### Step 5: Test M-Pesa Integration

**Sandbox Test Credentials:**
- Phone Number: `254708374149`
- Amount: Any amount (will be simulated)
- PIN: `1234`

---

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Deployment

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Step 1: Push to GitHub
```bash
git add -A
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Click **Import Project**
3. Select your GitHub repository
4. Click **Import**

#### Step 3: Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`:
   - Firebase credentials
   - M-Pesa credentials
3. Click **Save**

#### Step 4: Deploy
1. Click **Deploy**
2. Wait for the deployment to complete
3. Your app will be live at `your-project.vercel.app`

### Option 2: Deploy to Netlify

1. Go to [Netlify](https://netlify.com/)
2. Click **New site from Git**
3. Select your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Add environment variables
7. Deploy

### Option 3: Deploy to DigitalOcean App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com/)
2. Create a new App
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Add environment variables
6. Deploy

### Option 4: Self-Hosted (VPS/Server)

1. SSH into your server
2. Install Node.js and npm
3. Clone the repository
4. Install dependencies: `npm install`
5. Build the application: `npm run build`
6. Install PM2: `npm install -g pm2`
7. Start the application: `pm2 start npm --name "hallo-fresh" -- start`
8. Set up Nginx as reverse proxy
9. Configure SSL certificate with Let's Encrypt

---

## Project Structure

```
Hallo-Fresh-Grocery/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Main app routes
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── shop/page.tsx     # Product listing
│   │   │   ├── cart/page.tsx     # Shopping cart
│   │   │   ├── checkout/page.tsx # Checkout with M-Pesa
│   │   │   └── layout.tsx        # Dashboard layout
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── Footer.tsx            # Footer
│   │   └── ProductCard.tsx       # Product card
│   ├── data/
│   │   └── products.ts           # Product catalog
│   ├── services/
│   │   ├── mpesa.service.ts      # M-Pesa API
│   │   ├── auth.service.ts       # Authentication
│   │   └── order.service.ts      # Order management
│   ├── store/
│   │   └── cartStore.ts          # Zustand cart store
│   ├── hooks/
│   │   └── useAuth.ts            # Auth hook
│   ├── lib/
│   │   └── firebase.ts           # Firebase config
│   └── types/
│       └── index.ts              # TypeScript types
├── public/                        # Static assets
├── .env.local.example            # Environment template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind config
├── next.config.ts                # Next.js config
└── README.md                     # Documentation
```

---

## Environment Variables Reference

### Firebase Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### M-Pesa Variables
```env
NEXT_PUBLIC_MPESA_CONSUMER_KEY=
NEXT_PUBLIC_MPESA_CONSUMER_SECRET=
NEXT_PUBLIC_MPESA_BUSINESS_SHORT_CODE=174379
NEXT_PUBLIC_MPESA_PASSKEY=
NEXT_PUBLIC_MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
NEXT_PUBLIC_MPESA_ENVIRONMENT=sandbox
```

### Application Variables
```env
NEXT_PUBLIC_APP_NAME=Hallo Fresh Grocery
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Troubleshooting

### Build Errors

**Error: "Cannot find module"**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "TypeScript compilation failed"**
```bash
# Check TypeScript errors
npm run build
# Fix errors in the code
```

### Runtime Errors

**M-Pesa Payment Not Working**
- Verify credentials in `.env.local`
- Check phone number format (254XXXXXXXXX)
- Ensure business short code is correct
- Test with sandbox credentials first

**Firebase Connection Issues**
- Verify all Firebase credentials
- Check Firestore database is created
- Ensure authentication is enabled
- Check network connectivity

**Cart Not Persisting**
- Clear browser cache
- Check localStorage is enabled
- Verify Zustand store is initialized

### Performance Issues

**Slow Page Load**
```bash
# Analyze bundle size
npm run build
# Check Next.js analytics
```

**High Memory Usage**
- Reduce number of products in memory
- Implement pagination
- Use image optimization

---

## Security Considerations

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use HTTPS** - Always use secure connections
3. **Validate inputs** - Sanitize user data
4. **Protect API keys** - Use environment variables
5. **Enable CORS** - Configure properly for your domain
6. **Rate limiting** - Implement on backend
7. **Authentication** - Use Firebase Auth
8. **Data encryption** - Use HTTPS for all communications

---

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images before upload
   - Use WebP format

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting

3. **Caching**
   - Browser caching
   - CDN caching
   - API response caching

4. **Database Optimization**
   - Index frequently queried fields
   - Optimize Firestore queries
   - Use pagination

---

## Monitoring & Analytics

1. **Vercel Analytics** - Built-in with Vercel
2. **Firebase Analytics** - Configured in firebase.ts
3. **Google Analytics** - Add via next/script
4. **Error Tracking** - Use Sentry or similar

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Safaricom Daraja**: https://developer.safaricom.co.ke/
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## License

MIT License - See LICENSE file for details

---

**Last Updated**: February 2026
**Version**: 1.0.0
