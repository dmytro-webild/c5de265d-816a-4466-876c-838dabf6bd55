import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ExternalLink, X, Utensils, Coffee, HeartPulse, Sparkle, MapPin, CheckCircle, PhoneCall, ChevronRight } from "lucide-react";

type DemoId = "saffron" | "daybreak" | "palm" | "noor" | null;

export default function InteractivePortfolioSection() {
  const [activeDemo, setActiveDemo] = useState<DemoId>(null);
  const [activeTab, setActiveTab] = useState<string>("menu");

  // Reservation Form State for Saffron
  const [resDate, setResDate] = useState("Today, 20:00");
  const [resGuests, setResGuests] = useState("2 Guests");
  const [resSubmitted, setResSubmitted] = useState(false);

  // Clinic Form State for Palm
  const [clinicDoc, setClinicDoc] = useState("Dr. Sarah Al Mansoor");
  const [clinicTime, setClinicTime] = useState("Tomorrow, 10:00 AM");
  const [clinicSubmitted, setClinicSubmitted] = useState(false);

  // Quote Form State for Noor
  const [noorService, setNoorService] = useState("Signature Balayage");
  const [noorSubmitted, setNoorSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDemo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openDemo = (id: DemoId) => {
    setActiveDemo(id);
    setActiveTab(id === "saffron" ? "menu" : id === "daybreak" ? "drinks" : id === "palm" ? "doctors" : "services");
    setResSubmitted(false);
    setClinicSubmitted(false);
    setNoorSubmitted(false);
  };

  const demos = [
    {
      id: "saffron" as const,
      name: "Saffron Table",
      category: "Restaurant",
      tagline: "Contemporary Middle Eastern & Mediterranean Grill",
      location: "Al Wasl Road, Dubai",
      image: "https://img.b2bpic.net/free-photo/vegetable-stew-with-meat-corn-pieces-chili-pepper-vegetables-basilic-parsley-white-plate_114579-115.jpg",
      icon: Utensils,
      color: "bg-amber-500",
      description: "Explore instant digital menu items and test reserving a table with real-time slot selection.",
      features: ["Mobile Digital Menu", "Table Booking Widget", "Opening Hours & Location"]
    },
    {
      id: "daybreak" as const,
      name: "Daybreak Coffee",
      category: "Specialty Café",
      tagline: "Artisanal Coffee Roastery & Micro-Bakery",
      location: "Al Quoz 1, Dubai",
      image: "https://img.b2bpic.net/free-photo/high-angle-coffee-making-with-machine_23-2148865579.jpg",
      icon: Coffee,
      color: "bg-emerald-600",
      description: "Browse cold brews, V60 single origins, check live cafe hours, and trigger 1-tap WhatsApp orders.",
      features: ["Drinks & Pastry Menu", "Live Store Status", "Direct WhatsApp Ordering"]
    },
    {
      id: "palm" as const,
      name: "Palm Family Clinic",
      category: "Medical & Healthcare",
      tagline: "Boutique Wellness, Dentistry & Family Care",
      location: "Jumeirah Beach Road, Dubai",
      image: "https://img.b2bpic.net/free-photo/portrait-handsome-bearded-dentist-male-glasses-wearing-blue-uniform-sitting-dentist-office-looking-camera_613910-18529.jpg",
      icon: HeartPulse,
      color: "bg-cyan-600",
      description: "View specialist doctor profiles, operating hours, and test booking a consultation slot.",
      features: ["Doctor Profiles", "Appointment Booking", "Service Pricing List"]
    },
    {
      id: "noor" as const,
      name: "Studio Noor",
      category: "Salon & Aesthetics",
      tagline: "Luxury Hair Design, Facial Spa & Aesthetics",
      location: "DIFC Gate Avenue, Dubai",
      image: "https://img.b2bpic.net/free-photo/body-scrub-dried-shell-essential-oil-soap-bar-napkin-smartphone-black-background_23-2147971434.jpg",
      icon: Sparkle,
      color: "bg-purple-600",
      description: "Explore beauty treatments, transparent service packages, and request a personalized quote.",
      features: ["Treatment Catalog", "Instant Quote Form", "Portfolio Showcase"]
    }
  ];

  return (
    <section id="interactive-portfolio" className="py-20 lg:py-28 bg-[#EEEAF7] text-[#10111C] border-b border-[#E0D9ED]">
      <div className="w-[min(100%-2*var(--gutter),var(--max-w))] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7559BA]/20 border border-[#7559BA]/40 text-[#7559BA] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7559BA]" />
            <span>Interactive Portfolio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[length:var(--text-h1)] font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Try it as your customer would.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[length:var(--text-body-lg)] text-muted-foreground leading-relaxed"
          >
            Click any concept below to open a live interactive preview. Test how fast diners browse menus, check opening hours, or reserve tables on mobile.
          </motion.p>
        </div>

        {/* 4 Clickable Concept Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {demos.map((demo, idx) => {
            const Icon = demo.icon;
            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => openDemo(demo.id)}
                className="group relative bg-background border border-border rounded-(--radius-card) overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Image Preview Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={demo.image}
                      alt={demo.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Fictional Sample Work Label */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur border border-slate-700 text-white text-[11px] font-mono">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Fictional Sample Work</span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{demo.category}</span>
                    </div>

                    {/* Banner Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold font-heading mb-0.5">{demo.name}</h3>
                      <p className="text-xs text-slate-300 font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{demo.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-sm font-medium text-foreground mb-4">
                      {demo.tagline}
                    </p>

                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                      {demo.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {demo.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-[11px] font-mono"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-6 pb-6 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                  <span>Launch Live Concept Preview</span>
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Accompanying CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-(--radius-card) p-8 lg:p-12 text-center relative overflow-hidden shadow-xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-[length:var(--text-h2)] font-heading font-semibold mb-4 leading-snug">
              Ready to give your UAE business a website that converts?
            </h3>
            <p className="text-primary-foreground/80 text-[length:var(--text-body)] mb-8 leading-relaxed">
              Let us build a customized digital experience tailored to your brand, menu, operating hours, and location in Dubai.
            </p>
            <a
              href="#contact-arch-window"
              className="btn-secondary px-8 py-4 text-base font-medium inline-flex items-center gap-2 group"
            >
              <span>Book a Free Call</span>
              <PhoneCall className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Interactive Modal Preview Dialog */}
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDemo(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 relative flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold font-heading">
                        {demos.find((d) => d.id === activeDemo)?.name}
                      </h3>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Fictional Work
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
                      {demos.find((d) => d.id === activeDemo)?.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDemo(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* DEMO 1: SAFFRON TABLE */}
              {activeDemo === "saffron" && (
                <div className="p-6 bg-slate-50 dark:bg-slate-950 max-h-[75vh] overflow-y-auto">
                  {/* Tab selector */}
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 font-mono text-xs">
                    <button
                      onClick={() => setActiveTab("menu")}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === "menu" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      Sample Digital Menu
                    </button>
                    <button
                      onClick={() => setActiveTab("reserve")}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        activeTab === "reserve" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      Reserve a Table
                    </button>
                  </div>

                  {activeTab === "menu" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">Chef's Signature Starters</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded font-mono">Mobile Optimized</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Saffron Hummus &amp; Warm Pita</h4>
                            <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">AED 42</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Creamy chickpeas infused with Iranian saffron, extra virgin olive oil, toasted pine nuts.</p>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Charred Wagyu Beef Skewers</h4>
                            <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">AED 98</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Marinated in pomegranate molasses, sumac, served with garlic labneh.</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">Main Courses</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sumac Roasted Sea Bass</h4>
                            <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">AED 115</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Wild caught sea bass with saffron butter sauce, citrus fennel salad.</p>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Slow-Cooked Lamb Shank</h4>
                            <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">AED 130</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Braised for 8 hours with cinnamon, dried lime, served over jeweled rice.</p>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-amber-200">Want to see the reservation flow?</p>
                          <p className="text-[11px] text-slate-600 dark:text-amber-300">Click below to test table booking.</p>
                        </div>
                        <button
                          onClick={() => setActiveTab("reserve")}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors"
                        >
                          Test Booking Form
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "reserve" && (
                    <div>
                      {resSubmitted ? (
                        <div className="text-center py-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
                          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                          <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 mb-1">Reservation Confirmed!</h4>
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-4">
                            Table for {resGuests} on {resDate} reserved at Saffron Table.
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            (This is a simulated demo of MECLIN's direct reservation flow)
                          </p>
                          <button
                            onClick={() => setResSubmitted(false)}
                            className="mt-4 text-xs text-emerald-800 dark:text-emerald-300 underline font-semibold"
                          >
                            Reset Demo Form
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Reserve a Table at Saffron Table</h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-mono text-slate-500 mb-1">Party Size</label>
                              <select
                                value={resGuests}
                                onChange={(e) => setResGuests(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                              >
                                <option>2 Guests</option>
                                <option>4 Guests</option>
                                <option>6 Guests</option>
                                <option>8+ Guests</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-mono text-slate-500 mb-1">Preferred Time</label>
                              <select
                                value={resDate}
                                onChange={(e) => setResDate(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                              >
                                <option>Today, 20:00</option>
                                <option>Today, 21:30</option>
                                <option>Tomorrow, 19:30</option>
                                <option>Tomorrow, 21:00</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-500 mb-1">Your Name &amp; Contact</label>
                            <input
                              type="text"
                              placeholder="e.g. Tariq Mansoor (+971 50 852 0527)"
                              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                            />
                          </div>

                          <button
                            onClick={() => setResSubmitted(true)}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <span>Confirm Table Reservation</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* DEMO 2: DAYBREAK COFFEE */}
              {activeDemo === "daybreak" && (
                <div className="p-6 bg-slate-50 dark:bg-slate-950 max-h-[75vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Open Now • 07:00 - 22:00</span>
                    </div>
                    <span className="font-mono text-slate-500">Warehouse 42, Al Quoz 1</span>
                  </div>

                  <h4 className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-3">Popular Cold Brews &amp; Pastries</h4>

                  <div className="space-y-2.5 mb-6">
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Iced Spanish Latte</div>
                        <div className="text-xs text-slate-500">Double espresso, sweetened milk, ice</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">AED 28</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Single Origin V60 (Ethiopia)</div>
                        <div className="text-xs text-slate-500">Notes of jasmine, bergamot, peach</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">AED 26</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Pistachio Cream Croissant</div>
                        <div className="text-xs text-slate-500">Freshly baked butter croissant, pistachio filling</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">AED 24</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-600 text-white rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold">1-Tap WhatsApp Order Button</div>
                      <div className="text-[11px] text-emerald-100">Direct pickup order stream for Al Quoz patrons</div>
                    </div>
                    <a
                      href="#contact-arch-window"
                      onClick={() => setActiveDemo(null)}
                      className="px-3 py-1.5 bg-white text-emerald-950 font-bold text-xs rounded-lg hover:bg-emerald-50"
                    >
                      Test Action
                    </a>
                  </div>
                </div>
              )}

              {/* DEMO 3: PALM FAMILY CLINIC */}
              {activeDemo === "palm" && (
                <div className="p-6 bg-slate-50 dark:bg-slate-950 max-h-[75vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">Mon - Sat: 08:00 AM - 08:00 PM</span>
                    <span className="font-mono text-slate-500">Jumeirah Beach Road</span>
                  </div>

                  {clinicSubmitted ? (
                    <div className="text-center py-8 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6">
                      <CheckCircle className="w-12 h-12 text-cyan-500 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-cyan-900 dark:text-cyan-200 mb-1">Consultation Requested!</h4>
                      <p className="text-xs text-cyan-700 dark:text-cyan-300 mb-4">
                        Appointment request for {clinicDoc} on {clinicTime} logged.
                      </p>
                      <button
                        onClick={() => setClinicSubmitted(false)}
                        className="text-xs text-cyan-800 dark:text-cyan-300 underline font-semibold"
                      >
                        Reset Demo Form
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400">Book Clinic Consultation</h4>
                      
                      <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1">Select Specialist</label>
                        <select
                          value={clinicDoc}
                          onChange={(e) => setClinicDoc(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                        >
                          <option>Dr. Sarah Al Mansoor (Family Physician)</option>
                          <option>Dr. Marcus Vance (Pediatrics Specialist)</option>
                          <option>Dr. Layla Habib (Cosmetic Dentistry)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1">Preferred Time Slot</label>
                        <select
                          value={clinicTime}
                          onChange={(e) => setClinicTime(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                        >
                          <option>Tomorrow, 10:00 AM</option>
                          <option>Tomorrow, 02:30 PM</option>
                          <option>Day After, 11:00 AM</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setClinicSubmitted(true)}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Request Appointment Slot</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* DEMO 4: STUDIO NOOR */}
              {activeDemo === "noor" && (
                <div className="p-6 bg-slate-50 dark:bg-slate-950 max-h-[75vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">Tue - Sun: 10:00 AM - 08:00 PM</span>
                    <span className="font-mono text-slate-500">DIFC Gate Avenue</span>
                  </div>

                  {noorSubmitted ? (
                    <div className="text-center py-8 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                      <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-purple-900 dark:text-purple-200 mb-1">Quote Request Sent!</h4>
                      <p className="text-xs text-purple-700 dark:text-purple-300 mb-4">
                        Inquiry for {noorService} submitted successfully.
                      </p>
                      <button
                        onClick={() => setNoorSubmitted(false)}
                        className="text-xs text-purple-800 dark:text-purple-300 underline font-semibold"
                      >
                        Reset Demo Form
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase font-bold text-purple-600 dark:text-purple-400">Treatment &amp; Quote Inquiry</h4>
                      
                      <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1">Select Service</label>
                        <select
                          value={noorService}
                          onChange={(e) => setNoorService(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                        >
                          <option>Signature Balayage &amp; Styling (AED 650)</option>
                          <option>Hydrafacial Skin Renewal (AED 480)</option>
                          <option>Luxury Gel Pedicure &amp; Spa (AED 220)</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setNoorSubmitted(true)}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Request Customized Quote</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer */}
              <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>MECLIN Web Design Sample Concept</span>
                <a
                  href="#contact-arch-window"
                  onClick={() => setActiveDemo(null)}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <span>Build your site like this</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
