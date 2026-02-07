"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  ChevronRight,
  Smartphone,
  Globe,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  Bell,
  Search,
  Home,
  ClipboardList,
  User,
  LogOut,
  Settings,
  HelpCircle,
  TrendingUp,
  Gift,
  ChevronDown,
  Navigation,
  ShoppingBasket,
  Package
} from "lucide-react";

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative flex items-center justify-center p-1.5 bg-primary rounded-xl shadow-[0_0_20px_rgba(6,249,87,0.3)] group">
      <div className="absolute inset-0 bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3V21M18 3V21M6 12H18" stroke="#0a1a10" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3C12 3 14 7 18 7" stroke="#0a1a10" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col -gap-1">
      <h1 className="text-xl font-black tracking-tighter uppercase leading-none italic">Hallo Fresh</h1>
      <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60 leading-none ml-0.5">Grocery</span>
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 w-[300px] bg-[#0a1a10] border-r border-[#214a2f] z-[101] p-8 flex flex-col shadow-2xl"
        >
          <div className="flex items-center justify-between mb-12">
            <Logo />
            <button onClick={onClose} className="p-2 text-[#8ecca3] hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            {[
              { icon: <Home size={20} />, label: "Home", active: true },
              { icon: <TrendingUp size={20} />, label: "Popular" },
              { icon: <Gift size={20} />, label: "Offers" },
              { icon: <ClipboardList size={20} />, label: "My Orders" },
              { icon: <User size={20} />, label: "Profile" },
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-primary text-[#0a1a10]' : 'text-[#8ecca3] hover:bg-white/5 hover:text-white'}`}
              >
                {item.icon}
                <span className="font-black uppercase text-sm tracking-widest italic">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
            <button className="flex w-full items-center gap-4 p-4 text-[#8ecca3] hover:text-white rounded-2xl hover:bg-white/5 transition-all">
              <Settings size={20} />
              <span className="font-bold text-sm">Settings</span>
            </button>
            <button className="flex w-full items-center gap-4 p-4 text-[#8ecca3] hover:text-white rounded-2xl hover:bg-white/5 transition-all">
              <HelpCircle size={20} />
              <span className="font-bold text-sm">Help Center</span>
            </button>
            <button className="flex w-full items-center gap-4 p-4 text-red-400 hover:text-red-300 rounded-2xl hover:bg-red-400/5 transition-all mt-4">
              <LogOut size={20} />
              <span className="font-black uppercase text-sm italic tracking-widest">Logout</span>
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ServiceCard = ({ title, desc, img, index, icon: Icon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -15 }}
    className="group relative h-[300px] sm:h-[400px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5"
  >
    <img
      src={img}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10] via-[#0a1a10]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

    <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end items-start text-left">
      <div className="w-14 h-14 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-2xl flex items-center justify-center text-primary mb-6 transform -translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
        <Icon size={28} />
      </div>
      <h3 className="text-3xl sm:text-5xl font-black italic tracking-tighter uppercase leading-[0.8] mb-2 group-hover:text-primary transition-colors duration-500">
        {title}
      </h3>
      <p className="text-[12px] font-black text-[#8ecca3] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700">
        {desc}
      </p>
    </div>

    {/* Elegant Accent */}
    <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transform translate-x-20 group-hover:translate-x-0 transition-all duration-700 ease-extreme">
      <ArrowUpRight size={24} className="text-primary" />
    </div>
  </motion.div>
);

const VendorCard = ({ img, name, rating, tags, delivery, promo, time, isPromoted }: any) => (
  <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-[#214a2f] bg-[#183521] group cursor-pointer transition-all hover:shadow-2xl">
    <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
      <img
        alt={name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={img}
      />
      <div className="absolute top-4 left-4 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-black uppercase text-[#0a1a10] shadow-lg">
        {time}
      </div>
    </div>
    <div className="flex flex-col p-6 flex-1 justify-center">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-black text-2xl italic tracking-tighter">{name}</h4>
        <div className="flex items-center gap-1 text-sm font-black text-yellow-500">
          <Star size={14} fill="currentColor" />
          {rating}
        </div>
      </div>
      <p className="text-sm font-bold text-[#8ecca3] opacity-60 mb-4">{tags}</p>
      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
        <span className="text-[#8ecca3]">{delivery} Delivery</span>
        <span className="text-primary">{promo}</span>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function LandingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { title: "Food", desc: "Top restaurants", icon: Star, img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1000" },
    { title: "Grocery", desc: "Daily essentials", icon: ShoppingBasket, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000" },
    { title: "Pharmacy", desc: "Medicine delivery", icon: ClipboardList, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1000" },
    { title: "Shop", desc: "Store pickup", icon: Home, iconAlt: Gift, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" },
    { title: "Courier", desc: "Send packages", icon: Package, img: "https://images.unsplash.com/photo-1586769852044-692d6e3703a0?q=80&w=1000" },
    { title: "Ride", desc: "Book a ride", icon: Navigation, img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a1a10] text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* --- Desktop Header --- */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 hidden md:block px-6 lg:px-40 py-4 ${scrolled ? 'bg-[#0a1a10]/95 backdrop-blur-xl border-b border-[#214a2f]' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-primary hover:scale-110 transition-transform">
              <Menu size={28} />
            </button>
            <Logo />
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="h-12 px-8 rounded-2xl bg-[#183521] border border-[#214a2f] text-xs font-black uppercase tracking-widest hover:bg-[#214a2f] transition-all">Login</button>
            </Link>
            <Link href="/register">
              <button className="h-12 px-8 rounded-2xl bg-primary text-[#0a1a10] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,249,87,0.3)]">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- Mobile View --- */}
      <div className="md:hidden">
        {/* Mobile Top Bar */}
        <div className="sticky top-0 z-40 bg-[#0a1a10] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#183521] rounded-full flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Deliver to</span>
                <div className="flex items-center gap-1 cursor-pointer group">
                  <span className="font-bold text-sm group-hover:text-primary transition-colors">Home - 42 Maple Ave</span>
                  <ChevronDown size={14} className="text-primary" />
                </div>
              </div>
            </div>
            <button className="w-10 h-10 bg-[#183521] rounded-full flex items-center justify-center text-primary relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#183521]" />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none transition-transform group-focus-within:scale-110" />
            <input
              type="text"
              placeholder="Search food, grocery, or rides"
              className="w-full bg-[#183521] border border-[#214a2f] rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-0 focus:border-primary transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Mobile Main Content */}
        <div className="px-6 pb-24 space-y-12">
          {/* Promo Slider Mockup */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x no-scrollbar">
            <div className="min-w-[300px] h-44 rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-8 flex flex-col justify-end snap-center relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[#0a1a10] text-[10px] font-black uppercase tracking-[0.2em] mb-1">New User Only</p>
                <h3 className="text-[#0a1a10] text-3xl font-black italic tracking-tighter leading-none mb-3">50% OFF<br />First Order</h3>
                <button className="bg-[#0a1a10] text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Apply: HELLO50</button>
              </div>
              <ShoppingBasket className="absolute -right-10 -bottom-10 w-48 h-48 text-[#0a1a10]/10" />
            </div>
            <div className="min-w-[300px] h-44 rounded-3xl bg-[#183521] border border-[#214a2f] p-8 flex flex-col justify-end snap-center relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">Promo Partner</p>
                <h3 className="text-white text-3xl font-black italic tracking-tighter leading-none mb-3">UNLIMITED<br />FREE DELIVERY</h3>
                <button className="bg-primary text-[#0a1a10] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Start Trial</button>
              </div>
              <Star fill="currentColor" className="absolute -right-10 -bottom-10 w-48 h-48 text-primary/5 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black italic tracking-tighter uppercase">Our Services</h2>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-8 h-8 flex items-center justify-center text-primary"
              >
                <Menu size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <ServiceCard key={i} index={i} {...cat} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black italic tracking-tighter uppercase">Trending Near You</h2>
              <Link href="#" className="text-primary text-[10px] font-black uppercase tracking-widest">View All</Link>
            </div>
            <div className="space-y-4">
              <VendorCard
                name="Burger House"
                rating="4.8"
                tags="American • Burgers"
                delivery="Free"
                promo="Best Seller"
                time="20m"
                img="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400"
              />
              <VendorCard
                name="Pizza Roma"
                rating="4.6"
                tags="Italian • Pasta"
                delivery="£1.99"
                promo="50% Off"
                time="15m"
                img="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400"
              />
            </div>
          </section>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 inset-x-0 bg-[#0a1a10]/80 backdrop-blur-xl border-t border-[#214a2f] px-8 py-4 flex justify-between items-center z-50">
          {[
            { icon: <Home size={22} />, label: "Home", active: true },
            { icon: <Search size={22} />, label: "Search" },
            { icon: <ClipboardList size={22} />, label: "Orders" },
            { icon: <User size={22} />, label: "Profile" },
          ].map((item, i) => (
            <button key={i} className={`flex flex-col items-center gap-1 ${item.active ? 'text-primary' : 'text-[#8ecca3] opacity-50'}`}>
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Desktop Main --- */}
      <main className="hidden md:block px-6 lg:px-40 pt-32 pb-24">
        {/* ... (Existing Desktop Content) ... */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase italic">
                <Navigation size={14} className="animate-pulse" />
                Active in London
              </div>
              <h1 className="text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase">
                Freshness <br /> <span className="text-primary not-italic">Defined.</span>
              </h1>
              <p className="text-xl text-[#8ecca3] font-bold max-w-lg">
                The UK&apos;s most professional 15-minute grocery and ride-hailing network. Built for the modern elite.
              </p>
              <div className="flex w-full max-w-xl p-2 bg-[#183521] border border-[#214a2f] rounded-[2.5rem] shadow-2xl">
                <input
                  type="text"
                  placeholder="Where should we deliver?"
                  className="bg-transparent border-0 flex-1 px-8 font-bold text-lg placeholder:text-white/20 focus:ring-0"
                />
                <button className="bg-primary text-[#0a1a10] px-10 py-4 rounded-[2rem] font-black text-xl italic hover:scale-105 transition-all">Search</button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-[#183521] border border-[#214a2f] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000"
                  alt="Hero"
                  className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10] to-transparent" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary text-[#0a1a10] p-10 rounded-[3rem] shadow-2xl transform hover:-rotate-3 transition-all cursor-default">
                <p className="font-black text-4xl tracking-tighter leading-none italic uppercase">15 MIN<br />AVG SPEED</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-32">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">Our <span className="text-primary not-italic">Elite Services</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <ServiceCard key={i} index={i} {...cat} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Trending</h2>
            <Link href="#" className="text-primary font-black uppercase tracking-widest text-sm hover:underline">Explore All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <VendorCard
                key={i}
                name={i % 2 === 0 ? "Sushi Zen" : "Burger Master"}
                rating={i % 2 === 0 ? "4.9" : "4.8"}
                tags={i % 2 === 0 ? "Japanese • Premium" : "American • Classic"}
                delivery={i % 2 === 0 ? "£0.99" : "Free"}
                promo={i % 2 === 0 ? "Trending" : "Best Seller"}
                time={i % 2 === 0 ? "35m" : "15m"}
                img={i % 2 === 0 ? "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800" : "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800"}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Shared Footer for Desktop */}
      <footer className="hidden md:block bg-[#0a1a10] border-t border-[#214a2f] px-6 lg:px-40 py-24">
        <div className="mx-auto max-w-[1200px] grid grid-cols-4 gap-20">
          <div className="col-span-1">
            <Logo className="mb-10" />
            <p className="text-sm font-bold text-[#8ecca3] opacity-60 leading-relaxed mb-10 italic">London&apos;s most professional 15-minute grocery and ride-hailing network.</p>
            <div className="flex gap-6">
              {[Globe, Smartphone, Mail].map((Icon, i) => (
                <button key={i} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#183521] text-primary hover:bg-primary hover:text-[#0a1a10] transition-all"><Icon size={20} /></button>
              ))}
            </div>
          </div>
          {['Menu', 'Company', 'Legal'].map((title, i) => (
            <div key={i}>
              <h5 className="font-black text-primary uppercase tracking-[0.2em] italic mb-10">{title}</h5>
              <ul className="space-y-4 text-sm font-bold text-[#8ecca3]/40">
                {title === 'Menu' && ['Food', 'Grocery', 'Pharmacy', 'Courier', 'Rides'].map(l => <li key={l} className="hover:text-primary transition-colors cursor-pointer">{l}</li>)}
                {title === 'Company' && ['About', 'Careers', 'Partner', 'Investors'].map(l => <li key={l} className="hover:text-primary transition-colors cursor-pointer">{l}</li>)}
                {title === 'Legal' && ['Privacy', 'Terms', 'Security', 'Liability'].map(l => <li key={l} className="hover:text-primary transition-colors cursor-pointer">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1200px] mt-24 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
          © 2026 Hallo Fresh Grocery. Status: Operational.
        </div>
      </footer>
    </div>
  );
}
