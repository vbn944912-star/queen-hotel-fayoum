import React, { useState, useEffect } from 'react';
import { 
  Crown, Wifi, MapPin, Clock, Car, Sparkles, BedDouble, 
  Phone, Mail, Calendar, Users, Star, X, Menu, 
  Trash2, Ticket, Globe, Check, Building, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ROOMS, AMENITIES, FEATURES, TESTIMONIALS, GALLERY, TRANSLATIONS } from './data';
import { Booking } from './types';
import heroImg from './assets/images/queen_hotel_hero_1781080829857.png';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState('home');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Booking Form State
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomId: 'deluxe',
    guestsCount: 2
  });

  // Local State Bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBookingSuccessMsg, setActiveBookingSuccessMsg] = useState<string | null>(null);
  const [activeBookingCode, setActiveBookingCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Bookings from LocalStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('queen_hotel_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Update HTML tag direction when lang changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (lang === 'ar') {
      htmlElement.dir = 'rtl';
      htmlElement.lang = 'ar';
    } else {
      htmlElement.dir = 'ltr';
      htmlElement.lang = 'en';
    }
  }, [lang]);

  // Toast notifier helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to calculate cost safely
  const calculateBookingNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 0;
    const checkInDate = new Date(inDate);
    const checkOutDate = new Date(outDate);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    if (timeDiff <= 0) return 0;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getSelectedRoomPrice = () => {
    const room = ROOMS.find(r => r.id === formData.roomId);
    return room ? room.price : 4150;
  };

  const nightsNumber = calculateBookingNights(formData.checkIn, formData.checkOut);
  const expectedTotalPrice = getSelectedRoomPrice() * (nightsNumber || 1);

  // Handle Form Submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
    if (!formData.guestName.trim()) {
      showToast(lang === 'ar' ? 'الرجاء إدخال الاسم الكامل' : 'Please enter your full name');
      return;
    }
    if (!formData.phone.trim()) {
      showToast(lang === 'ar' ? 'الرجاء إدخال رقم الهاتف' : 'Please enter your phone number');
      return;
    }
    if (!formData.checkIn) {
      showToast(lang === 'ar' ? 'الرجاء تحديد تاريخ الوصول' : 'Please select a check-in date');
      return;
    }
    if (!formData.checkOut) {
      showToast(lang === 'ar' ? 'الرجاء تحديد تاريخ المغادرة' : 'Please select a check-out date');
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    if (checkOutDate <= checkInDate) {
      showToast(lang === 'ar' ? 'تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول' : 'Check-out must be after check-in');
      return;
    }

    const roomObj = ROOMS.find(r => r.id === formData.roomId);
    if (!roomObj) return;

    const generatedCode = 'QH-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: generatedCode,
      roomId: formData.roomId,
      roomNameAr: roomObj.nameAr,
      roomNameEn: roomObj.nameEn,
      guestName: formData.guestName,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guestsCount: Number(formData.guestsCount),
      totalPrice: expectedTotalPrice,
      status: 'pending',
      bookingDate: new Date().toLocaleDateString()
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('queen_hotel_bookings', JSON.stringify(updatedBookings));

    setActiveBookingCode(generatedCode);
    setActiveBookingSuccessMsg(TRANSLATIONS[lang].bookingSuccess + generatedCode);
    showToast(lang === 'ar' ? 'تم حفظ حجزك الملكي بنجاح!' : 'Your royal booking has been saved!');

    // Reset Form (except some defaults)
    setFormData({
      guestName: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      roomId: 'deluxe',
      guestsCount: 2
    });

    // Scroll to the active success ticket or results
    setTimeout(() => {
      const ticketEl = document.getElementById('booking-ticket');
      if (ticketEl) {
        ticketEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Cancel Booking
  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('queen_hotel_bookings', JSON.stringify(updated));
    showToast(TRANSLATIONS[lang].deleteSuccess);
  };

  // Set preset room and scroll to booking form
  const handlePreSelectRoom = (roomId: string) => {
    setFormData(prev => ({ ...prev, roomId: roomId }));
    const formEl = document.getElementById('booking-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(lang === 'ar' ? `تم تحديد ${ROOMS.find(r => r.id === roomId)?.nameAr} في استمارة الحجز!` : `${ROOMS.find(r => r.id === roomId)?.nameEn} selected in booking form!`);
  };

  // Icon switcher mapping helper
  const renderIcon = (iconName: string, className: string = "w-6 h-6 text-gold") => {
    switch (iconName) {
      case 'BedDouble': return <BedDouble className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Car': return <Car className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Unique gallery categories
  const galleryCategories = ['all', ...Array.from(new Set(GALLERY.map(item => item.categoryAr)))];
  const galleryCategoriesEn = ['all', ...Array.from(new Set(GALLERY.map(item => item.categoryEn)))];

  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY 
    : GALLERY.filter(item => item.categoryAr === galleryFilter || item.categoryEn === galleryFilter);

  return (
    <div className="min-h-screen bg-[#111111] text-white selection:bg-gold selection:text-black font-sans overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 left-6 md:left-auto md:w-96 z-50 bg-neutral-900 border-2 border-gold rounded-xl p-4 shadow-2xl flex items-start gap-3"
          >
            <div className="bg-gold/10 p-2 rounded-lg text-gold">
              <Crown className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gold">
                {lang === 'ar' ? 'تنبيه ملكي' : 'Royal Update'}
              </p>
              <p className="text-xs text-stone-200 mt-1 font-medium">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Branding */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-md border-b border-gold/15 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Brand markup */}
            <a href="#home" className="flex items-center gap-3 group" id="brand-logo">
              <div className="bg-gradient-to-br from-gold via-yellow-500 to-amber-700 p-2.5 rounded-xl shadow-lg border border-gold/40 flex items-center justify-center transition-transform group-hover:scale-105">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div className="text-right">
                <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-gold transition-colors font-serif">
                  {lang === 'ar' ? 'فندق كوين' : 'Queen Hotel'}
                </h1>
                <p className="text-[10px] text-stone-400 font-medium tracking-wide">
                  {lang === 'ar' ? 'راحة ملكية بالفيوم' : 'Royal Stay in Fayoum'}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-3" id="desktop-nav">
              <a 
                href="#home" 
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'home' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navHome}
              </a>
              <a 
                href="#rooms-section" 
                onClick={() => setActiveTab('rooms')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'rooms' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navRooms}
              </a>
              <a 
                href="#why-queen-section" 
                onClick={() => setActiveTab('amenities')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'amenities' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navAmenities}
              </a>
              <a 
                href="#gallery-section" 
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'gallery' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navGallery}
              </a>
              <a 
                href="#booking-section" 
                onClick={() => setActiveTab('book')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'book' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navBook}
              </a>
              <a 
                href="#contact-section" 
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === 'contact' ? 'text-gold bg-gold/10 border-b-2 border-gold' : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {TRANSLATIONS[lang].navContact}
              </a>
              {bookings.length > 0 && (
                <a 
                  href="#my-bookings-section" 
                  onClick={() => setActiveTab('mybookings')}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/30 flex items-center gap-1.5 transition-all"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>{TRANSLATIONS[lang].navMyBookings} ({bookings.length})</span>
                </a>
              )}
            </nav>

            {/* Language Toggle & CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => {
                  const targetLang = lang === 'ar' ? 'en' : 'ar';
                  setLang(targetLang);
                  showToast(targetLang === 'ar' ? 'تم تفعيل اللغة العربية' : 'English language enabled');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gold border border-gold/35 rounded-lg hover:bg-gold/10 transition-colors"
                id="language-switcher"
              >
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              <a 
                href="#booking-section"
                className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-black text-xs font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-gold/10 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {TRANSLATIONS[lang].btnBookNow}
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => {
                  const targetLang = lang === 'ar' ? 'en' : 'ar';
                  setLang(targetLang);
                  showToast(targetLang === 'ar' ? 'تم تفعيل اللغة العربية' : 'English language enabled');
                }}
                className="p-2 text-gold border border-gold/20 rounded-lg hover:bg-gold/10"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-stone-300 hover:text-gold transition-colors border border-stone-800 rounded-lg"
                aria-label="Toggle menu"
                id="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-neutral-900 border-b border-gold/20 overflow-hidden"
              id="mobile-menu-panel"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <a 
                  href="#home" 
                  onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navHome}
                </a>
                <a 
                  href="#rooms-section" 
                  onClick={() => { setActiveTab('rooms'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navRooms}
                </a>
                <a 
                  href="#why-queen-section" 
                  onClick={() => { setActiveTab('amenities'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navAmenities}
                </a>
                <a 
                  href="#gallery-section" 
                  onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navGallery}
                </a>
                <a 
                  href="#booking-section" 
                  onClick={() => { setActiveTab('book'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navBook}
                </a>
                <a 
                  href="#contact-section" 
                  onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                  className="px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                >
                  {TRANSLATIONS[lang].navContact}
                </a>
                {bookings.length > 0 && (
                  <a 
                    href="#my-bookings-section" 
                    onClick={() => { setActiveTab('mybookings'); setMobileMenuOpen(false); }}
                    className="mx-3 mt-2 p-3 text-center text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded-xl"
                  >
                    {TRANSLATIONS[lang].navMyBookings} ({bookings.length})
                  </a>
                )}
                <div className="pt-4 border-t border-stone-800">
                  <a 
                    href="#booking-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-gold to-amber-600 text-black text-xs font-bold py-3 rounded-lg"
                  >
                    {TRANSLATIONS[lang].btnBookNow}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Queen Hotel Exterior Sunset" 
            className="w-full h-full object-cover transform scale-105 animate-[pulse_8s_infinite] opacity-65"
            referrerPolicy="no-referrer"
          />
          {/* Ambient overlays to match visually luxurious golden vibes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#111111] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl text-right lg:text-right">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/13 border border-gold/30 text-gold text-xs font-semibold mb-6 tracking-wide"
            >
              <Crown className="w-4 h-4 text-gold" />
              <span>{TRANSLATIONS[lang].slogan}</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight font-serif tracking-tight"
            >
              {TRANSLATIONS[lang].heroTitle}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed font-light font-sans"
            >
              {TRANSLATIONS[lang].heroDescription}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row-reverse gap-4 justify-start"
            >
              <a 
                href="#booking-section"
                className="px-8 py-4 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-gold/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{TRANSLATIONS[lang].btnBookNow}</span>
              </a>
              <a 
                href="#contact-section"
                className="px-8 py-4 bg-white/5 border border-white/20 hover:bg-white/10 text-white rounded-xl font-semibold backdrop-blur-sm transition-colors text-sm text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>{TRANSLATIONS[lang].btnContactUs}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative corner indicators in black-gold royal aesthetics */}
        <div className="absolute bottom-8 left-8 hidden md:block text-stone-500 font-mono text-xs opacity-75">
          <p>📍 Fayoum, Egypt</p>
          <p className="mt-1">29°18'28"N 30°50'24"E</p>
        </div>
      </section>

      {/* Why Choose Queen Hotel Section */}
      <section 
        id="why-queen-section" 
        className="py-24 bg-gradient-to-b from-[#111111] to-[#161616] border-y border-gold/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-stone-400 font-mono uppercase tracking-widest text-xs mb-3 font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Queen Pride</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              {TRANSLATIONS[lang].whyChooseTitle}
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base font-light font-sans">
              {TRANSLATIONS[lang].whyChooseSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((amenity, idx) => (
              <motion.div 
                key={amenity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1e1e1e]/60 border border-stone-800/80 p-8 rounded-2xl relative overflow-hidden group hover:border-gold/30 hover:bg-neutral-900 transition-all duration-300"
                id={`amenity-card-${amenity.id}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:bg-gold/10 transition-colors" />
                
                <div className="bg-gradient-to-br from-[#2a2a2a] to-stone-900 p-4 rounded-xl border border-stone-800 w-14 h-14 flex items-center justify-center mb-6 group-hover:border-gold/20 transition-colors">
                  {renderIcon(amenity.iconName, "w-7 h-7 text-gold")}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors font-serif">
                  {lang === 'ar' ? amenity.nameAr : amenity.nameEn}
                </h3>
                
                <p className="mt-3 text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
                  {lang === 'ar' ? amenity.descriptionAr : amenity.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Rooms Showcase Section */}
      <section id="rooms-section" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-stone-400 font-mono uppercase tracking-widest text-xs mb-3 font-semibold flex items-center justify-center gap-2">
              <BedDouble className="w-4 h-4 text-gold" />
              <span>Royal Chambers</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              {TRANSLATIONS[lang].roomsTitle}
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
              {TRANSLATIONS[lang].roomsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#1e1e1e] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-gold/30 transition-all duration-300"
                id={`room-${room.id}`}
              >
                {/* Image panel with hover scaling effect */}
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-gold px-3.5 py-1.5 rounded-lg text-xs font-semibold z-10 border border-gold/25">
                    {TRANSLATIONS[lang].priceStarting} <span className="font-bold font-mono text-sm">{room.price}</span> {lang === 'ar' ? 'ج.م' : 'EGP'}
                  </div>
                  <img 
                    src={room.image} 
                    alt={lang === 'ar' ? room.nameAr : room.nameEn}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end z-10">
                    <p className="text-stone-300 text-xs font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                      <Users className="w-3.5 h-3.5 text-gold" />
                      <span>{TRANSLATIONS[lang].capacityLabel} {room.capacity} {TRANSLATIONS[lang].guestsCountName}</span>
                    </p>
                  </div>
                </div>

                {/* Info and Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors font-serif">
                      {lang === 'ar' ? room.nameAr : room.nameEn}
                    </h3>
                    <p className="mt-3 text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      {lang === 'ar' ? room.descriptionAr : room.descriptionEn}
                    </p>

                    <div className="mt-6 pt-6 border-t border-stone-800/80 space-y-3">
                      {(lang === 'ar' ? room.featuresAr : room.featuresEn).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-stone-300">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Trigger button */}
                  <div className="mt-8">
                    <button
                      onClick={() => handlePreSelectRoom(room.id)}
                      className="w-full py-3 px-4 bg-stone-900 border border-gold/40 hover:bg-gold hover:text-black hover:border-gold text-gold rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>{TRANSLATIONS[lang].btnBookRoom}</span>
                      {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Checklist Summary Section (قسم المميزات) */}
      <section className="py-24 bg-gradient-to-t from-[#111111] via-[#1a1a1a] to-[#111111] border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Promo descriptive block */}
            <div className="lg:col-span-5 text-right lg:text-right">
              <div className="bg-gold/12 p-2 rounded-xl text-gold inline-flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest">
                <Crown className="w-4 h-4 text-gold" />
                <span>Amenities checklist</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
                {lang === 'ar' ? 'التزام تام بأعلى معايير الرفاهية' : 'Full commitment to royal relaxation Standards'}
              </h2>
              <p className="mt-4 text-stone-400 text-sm sm:text-base font-light leading-relaxed">
                {lang === 'ar' 
                  ? 'نهدف في فندق كوين إلى صياغة خدمات وتسهيلات ممتازة تجعلك تشعر بالأمان والخصوصية والهدوء. جميع احتياجاتك تلبى فوراً بواسطة طاقمنا المؤهل.'
                  : 'At Queen Hotel, we aim to design services and experiences that keep you safe, relaxed, and fully cared for. Every requirement is attended to with supreme velocity.'}
              </p>
              <div className="mt-8 p-6 bg-stone-900/60 border border-stone-800 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">{lang === 'ar' ? 'رقم الاتصال المباشر' : 'Direct Assistance Hotline'}</p>
                  <p className="text-xl font-bold font-mono text-gold mt-1">0842204339</p>
                </div>
                <div className="bg-gold/10 p-3 rounded-xl text-gold">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Checklist elements */}
            <div className="lg:col-span-7 bg-[#1c1c1c] border border-stone-800 p-8 sm:p-10 rounded-3xl" id="features-checklist-panel">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {FEATURES.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-stone-900/50 hover:bg-stone-900 border border-stone-800/60 hover:border-gold/20 rounded-xl transition-all"
                  >
                    <div className="bg-[#2a2a2a] border border-gold/30 text-gold p-1.5 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-stone-100 font-bold text-sm">
                        {lang === 'ar' ? item.ar : item.en}
                      </p>
                      <p className="text-stone-400 text-xs mt-1">
                        {lang === 'ar' ? 'خدمة مدمجة بالإقامة' : 'Included in booking stay'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Guest Testimonials */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-stone-400 font-mono uppercase tracking-widest text-xs mb-3 font-semibold flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-gold" />
              <span>Reviews</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              {TRANSLATIONS[lang].testimonialsTitle}
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
              {TRANSLATIONS[lang].testimonialsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-[#1e1e1e]/60 border border-stone-800/80 p-8 rounded-2xl flex flex-col justify-between hover:border-gold/20 transition-all group"
                id={`testimonial-${testimonial.id}`}
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light italic">
                    " {lang === 'ar' ? testimonial.commentAr : testimonial.commentEn} "
                  </p>
                </div>

                {/* Author Name and Info */}
                <div className="mt-8 pt-5 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-stone-100 font-bold text-sm">
                      {lang === 'ar' ? testimonial.nameAr : testimonial.nameEn}
                    </h4>
                    <p className="text-stone-500 text-xs mt-1 font-mono">
                      {testimonial.date}
                    </p>
                  </div>
                  <div className="bg-[#2a2a2a] p-2 rounded-lg text-gold font-serif text-xs font-bold font-mono">
                    5.0 ⭐
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Visual Image Gallery Section */}
      <section id="gallery-section" className="py-24 bg-[#161616] border-y border-stone-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              {TRANSLATIONS[lang].galleryTitle}
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
              {TRANSLATIONS[lang].gallerySub}
            </p>

            {/* Filter buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-2" id="gallery-category-filters">
              {(lang === 'ar' ? galleryCategories : galleryCategoriesEn).map((cat, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => {
                    const matchedCat = lang === 'ar' ? cat : galleryCategories[cIdx];
                    setGalleryFilter(matchedCat);
                    showToast(lang === 'ar' ? `تصفية: ${cat}` : `Filter: ${cat}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    (galleryFilter === cat || (lang !== 'ar' && galleryFilter === galleryCategories[cIdx]))
                      ? 'bg-gold text-black shadow-lg shadow-gold/15' 
                      : 'bg-[#212121] text-stone-300 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  {cat === 'all' ? TRANSLATIONS[lang].filterAll : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery display grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-image-grid">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1e1e1e] border border-stone-800/70 rounded-2xl overflow-hidden shadow-xl relative group h-72 sm:h-80"
                >
                  <img 
                    src={item.image} 
                    alt={lang === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle fade-in info tag */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="bg-gold text-black text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md self-start mb-2.5">
                      {lang === 'ar' ? item.categoryAr : item.categoryEn}
                    </p>
                    <h4 className="text-white font-bold text-base font-serif">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-stone-400 text-xs mt-1.5 font-light font-sans">
                      {lang === 'ar' ? 'فندق كوين ميتينجز' : 'Queen Hotel Collections'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-section" className="py-24 bg-gradient-to-b from-[#111111] to-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Promo Left Side */}
            <div className="lg:col-span-4 flex flex-col justify-between text-right lg:text-right">
              <div>
                <h3 className="text-stone-400 font-mono uppercase tracking-widest text-xs mb-3 font-semibold flex items-center justify-start gap-2">
                  <Ticket className="w-4 h-4 text-gold" />
                  <span>Reserve Now</span>
                </h3>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
                  {TRANSLATIONS[lang].bookingTitle}
                </h2>
                <p className="mt-4 text-stone-400 text-sm sm:text-base font-light leading-relaxed">
                  {TRANSLATIONS[lang].bookingSub}
                </p>
              </div>

              {/* Dynamic Cost Estimate Panel */}
              <div className="mt-10 p-6 bg-[#161616] border-2 border-dashed border-gold/25 rounded-2xl" id="cost-estimate-panel">
                <div className="flex items-center gap-2 text-gold mb-3">
                  <Crown className="w-5 h-5 animate-spin-slow" />
                  <span className="text-xs font-bold tracking-widest uppercase">{lang === 'ar' ? 'تقدير التكلفة الملكية' : 'Estimated Pricing'}</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center text-xs text-stone-300">
                    <span>{lang === 'ar' ? 'سعر الغرفة اليومي' : 'Room Rate Per Day'}</span>
                    <span className="font-bold text-stone-100 font-mono">
                      {getSelectedRoomPrice()} {lang === 'ar' ? 'جم' : 'EGP'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-stone-300">
                    <span>{lang === 'ar' ? 'عدد الليالي المحددة' : 'Number of Nights'}</span>
                    <span className="font-bold text-stone-100 font-mono">
                      {nightsNumber > 0 ? nightsNumber : 1} {lang === 'ar' ? 'ليالي' : 'Nights'}
                    </span>
                  </div>
                  <div className="border-t border-stone-800 pt-3 flex justify-between items-center text-sm font-bold text-white">
                    <span className="text-gold">{TRANSLATIONS[lang].totalPrice}</span>
                    <span className="text-lg text-emerald-400 font-mono">
                      {expectedTotalPrice} {lang === 'ar' ? 'جنيه مصرى' : 'EGP'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Interactive Form Block */}
            <div className="lg:col-span-8 bg-[#161616] border border-stone-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative">
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                
                {/* Full name input */}
                <div>
                  <label htmlFor="guestName" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                    {TRANSLATIONS[lang].formName} <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="guestName"
                      required
                      placeholder={lang === 'ar' ? 'ادخل اسمك الثلاثي الكامل' : 'Enter your full triple name'}
                      value={formData.guestName}
                      onChange={(e) => setFormData(prev => ({ ...prev, guestName: e.target.value }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 placeholder:text-stone-600 focus:outline-none transition-colors text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      {TRANSLATIONS[lang].formPhone} <span className="text-gold">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      placeholder={TRANSLATIONS[lang].formPhonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 placeholder:text-stone-600 focus:outline-none transition-colors text-sm font-mono"
                    />
                  </div>

                  {/* Room picker select */}
                  <div>
                    <label htmlFor="roomId" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      {TRANSLATIONS[lang].formRoomType}
                    </label>
                    <select
                      id="roomId"
                      value={formData.roomId}
                      onChange={(e) => setFormData(prev => ({ ...prev, roomId: e.target.value }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 focus:outline-none transition-colors text-sm font-medium"
                    >
                      {ROOMS.map(room => (
                        <option key={room.id} value={room.id}>
                          {lang === 'ar' ? room.nameAr : room.nameEn} ({room.price} {lang === 'ar' ? 'جم' : 'EGP'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Check-In input */}
                  <div>
                    <label htmlFor="checkIn" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      {TRANSLATIONS[lang].formCheckIn} <span className="text-gold">*</span>
                    </label>
                    <input 
                      type="date" 
                      id="checkIn"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 focus:outline-none transition-colors text-sm font-mono text-center"
                    />
                  </div>

                  {/* Check-Out input */}
                  <div>
                    <label htmlFor="checkOut" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      {TRANSLATIONS[lang].formCheckOut} <span className="text-gold">*</span>
                    </label>
                    <input 
                      type="date" 
                      id="checkOut"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 focus:outline-none transition-colors text-sm font-mono text-center"
                    />
                  </div>

                  {/* Number of guests select */}
                  <div>
                    <label htmlFor="guestsCount" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                      {TRANSLATIONS[lang].formGuests}
                    </label>
                    <select
                      id="guestsCount"
                      value={formData.guestsCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, guestsCount: Number(e.target.value) }))}
                      className="w-full bg-[#1e1e1e] border border-stone-800 focus:border-gold rounded-xl px-4 py-3.5 text-stone-100 focus:outline-none transition-colors text-sm font-medium"
                    >
                      <option value="1">1 {lang === 'ar' ? 'نزيل - فردي' : 'Guest'}</option>
                      <option value="2">2 {lang === 'ar' ? 'نزلاء - زوجي' : 'Guests'}</option>
                      <option value="3">3 {lang === 'ar' ? '3 نزلاء' : 'Guests'}</option>
                      <option value="4">4 {lang === 'ar' ? '4 نزلاء' : 'Guests'}</option>
                    </select>
                  </div>
                </div>

                {/* Confirm Booking CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-gold text-black font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-2xl transition-all font-sans transform hover:scale-[1.01]"
                  >
                    {TRANSLATIONS[lang].btnConfirmBooking}
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Active reservation ticket details (حجوزاتي) */}
      <AnimatePresence>
        {bookings.length > 0 && (
          <section id="my-bookings-section" className="py-24 bg-[#111111] border-t border-stone-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              
              <div className="text-center mb-10">
                <Crown className="w-8 h-8 text-gold mx-auto mb-3 animate-pulse" />
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                  {TRANSLATIONS[lang].myBookingsTitle}
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  {lang === 'ar' 
                    ? 'يمكنك حفظ، استعراض، والتحقق وإلغاء حجوزاتك المحفوظة محلياً أدناه.' 
                    : 'Analyze, review, customize or undo your ongoing bookings cached in your browser below.'}
                </p>
              </div>

              {/* Tickets list */}
              <div className="space-y-8" id="bookings-local-list">
                {bookings.map((b) => (
                  <motion.div 
                    key={b.id}
                    layoutId={`ticket-${b.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-neutral-900 border-2 border-gold/25 rounded-2xl shadow-xl overflow-hidden"
                  >
                    {/* Header receipt panel */}
                    <div className="bg-gradient-to-r from-stone-900 to-[#1c1c1c] p-6 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gold/10 p-2 rounded-xl text-gold">
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-stone-400 text-[10px] uppercase font-mono tracking-wider">{lang === 'ar' ? 'رمز الحجز الملكي' : 'Royal Ticket ID'}</p>
                          <p className="font-bold font-mono text-gold text-lg">{b.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping" />
                        <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                          {TRANSLATIONS[lang].bookingStatusPending}
                        </span>
                      </div>
                    </div>

                    {/* Receipt Body */}
                    <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-stone-200">
                      <div>
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'اسم النزيل' : 'Guest Name'}</p>
                        <p className="text-sm font-bold text-white mt-1">{b.guestName}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</p>
                        <p className="text-sm font-bold font-mono text-white mt-1">{b.phone}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'الغرفة المحددة' : 'Selected Room'}</p>
                        <p className="text-sm font-bold text-gold mt-1">
                          {lang === 'ar' ? b.roomNameAr : b.roomNameEn}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'عدد النزلاء' : 'Guests Count'}</p>
                        <p className="text-sm font-bold text-white mt-1">{b.guestsCount} {TRANSLATIONS[lang].guestsCountName}</p>
                      </div>

                      <div className="sm:border-t sm:border-stone-800/80 sm:pt-6">
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'تاريخ الوصول' : 'Check-In'}</p>
                        <p className="text-sm font-bold font-mono text-emerald-400 mt-1">{b.checkIn}</p>
                      </div>
                      <div className="sm:border-t sm:border-stone-800/80 sm:pt-6">
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'تاريخ المغادرة' : 'Check-Out'}</p>
                        <p className="text-sm font-bold font-mono text-rose-400 mt-1">{b.checkOut}</p>
                      </div>
                      <div className="sm:border-t sm:border-stone-800/80 sm:pt-6">
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'سجل بتاريخ' : 'Registered Date'}</p>
                        <p className="text-xs font-mono mt-1 text-stone-400">{b.bookingDate}</p>
                      </div>
                      <div className="sm:border-t sm:border-stone-800/80 sm:pt-6">
                        <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">{lang === 'ar' ? 'السعر الإجمالي الكلي' : 'Total Price'}</p>
                        <p className="text-base font-bold font-mono text-emerald-400 mt-0.5">{b.totalPrice} {lang === 'ar' ? 'جم' : 'EGP'}</p>
                      </div>
                    </div>

                    {/* Receipt footer */}
                    <div className="bg-stone-900 px-6 sm:px-8 py-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-stone-400 text-xs font-light">
                        {lang === 'ar' ? 'يرجى طباعة أو تصوير هذه الصفحة لإبرازها لمكتب الاستقبال.' : 'Please print or snapshot this code to represent at check-in counter.'}
                      </p>
                      <button 
                        onClick={() => handleCancelBooking(b.id)}
                        className="px-4 py-2 bg-rose-950/40 text-rose-400 hover:bg-rose-900/30 border border-rose-500/20 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{TRANSLATIONS[lang].btnCancelBooking}</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Main Contact Us Panel */}
      <section id="contact-section" className="py-24 bg-[#161616] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-stone-400 font-mono uppercase tracking-widest text-xs mb-3 font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <span>Contact Desk</span>
            </h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              {TRANSLATIONS[lang].contactTitle}
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
              {TRANSLATIONS[lang].contactSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Address box */}
            <div className="bg-[#1e1e1e] border border-stone-800 p-8 rounded-2xl text-center flex flex-col items-center">
              <div className="bg-gold/10 p-4 rounded-xl text-gold mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-stone-100 font-bold text-base font-serif">{TRANSLATIONS[lang].addressLabel}</h4>
              <p className="text-stone-400 text-sm mt-3 leading-relaxed font-light">{TRANSLATIONS[lang].addressValue}</p>
            </div>

            {/* Direct Telephone box */}
            <a 
              href="tel:0842204339"
              className="bg-[#1e1e1e] hover:bg-[#222222] border border-stone-800 hover:border-gold/30 p-8 rounded-2xl text-center flex flex-col items-center transition-all group"
            >
              <div className="bg-gold/10 p-4 rounded-xl text-gold mb-6 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-stone-100 font-bold text-base font-serif">{TRANSLATIONS[lang].phoneLabel}</h4>
              <p className="text-gold font-bold font-mono text-xl mt-3">0842204339</p>
              <p className="text-stone-500 text-xs mt-2">{lang === 'ar' ? 'اضغط للاتصال المباشر' : 'Click to call operator'}</p>
            </a>

            {/* Email link box */}
            <a 
              href="mailto:info@queenhotel-eg.com"
              className="bg-[#1e1e1e] hover:bg-[#222222] border border-stone-800 hover:border-gold/30 p-8 rounded-2xl text-center flex flex-col items-center transition-all group"
            >
              <div className="bg-gold/10 p-4 rounded-xl text-gold mb-6 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-stone-100 font-bold text-base font-serif">{TRANSLATIONS[lang].emailLabel}</h4>
              <p className="text-stone-200 font-bold font-mono text-sm sm:text-base mt-3">info@queenhotel-eg.com</p>
              <p className="text-stone-500 text-xs mt-2">{lang === 'ar' ? 'اضغط للمراسلة الرسمية' : 'Click to send corporate email'}</p>
            </a>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1e1e1e] border border-stone-800 rounded-3xl p-8 sm:p-10">
            <div className="lg:col-span-4 text-center lg:text-right">
              <h4 className="text-white font-bold text-lg font-serif">{TRANSLATIONS[lang].hoursLabel}</h4>
              <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                {TRANSLATIONS[lang].hoursValue}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#252525] border border-emerald-500/20 text-emerald-400 rounded-full font-mono text-xs font-semibold mt-4">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACTIVE STATE: OK</span>
              </div>
            </div>

            {/* Simulated premium luxury map canvas */}
            <div className="lg:col-span-8 h-64 sm:h-72 w-full rounded-2xl border-2 border-dashed border-gold/15 bg-stone-900/40 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-radial-gradient">
              <div className="p-3 bg-gold/10 rounded-full text-gold mb-3 animate-bounce">
                <MapPin className="w-7 h-7" />
              </div>
              <h5 className="font-bold text-white text-sm font-serif">Queen Hotel Map Pointer</h5>
              <p className="text-[11px] text-stone-400 mt-2 max-w-sm font-light">
                {lang === 'ar' 
                  ? 'يقع الفندق بوسط مدينة الفيوم بجوار قسم أول ومحطة القطار وسوق المدينة.' 
                  : 'Located centrally beside Al Fayoum railway station & local hypermarkets.'}
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 px-4 py-1.5 bg-gradient-to-r from-gold to-amber-600 text-black text-xs font-bold rounded-lg hover:shadow-lg transition-all"
              >
                {lang === 'ar' ? 'عرض على خرائط جوجل' : 'View on Google Maps'}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Elegant Golden Footer */}
      <footer className="bg-black text-stone-400 py-16 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Signature Block */}
            <div className="md:col-span-2 text-right md:text-right space-y-4">
              <div className="flex items-center justify-start md:justify-start gap-2">
                <div className="bg-gold p-1.5 rounded-lg text-black">
                  <Crown className="w-5 h-5" />
                </div>
                <span className="text-white font-bold font-serif text-lg">Queen Hotel</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                {TRANSLATIONS[lang].footerSlogan}
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-serif">
                {TRANSLATIONS[lang].footerQuickLinks}
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#home" className="hover:text-gold transition-colors">{TRANSLATIONS[lang].navHome}</a>
                </li>
                <li>
                  <a href="#rooms-section" className="hover:text-gold transition-colors">{TRANSLATIONS[lang].navRooms}</a>
                </li>
                <li>
                  <a href="#why-queen-section" className="hover:text-gold transition-colors">{TRANSLATIONS[lang].navAmenities}</a>
                </li>
                <li>
                  <a href="#booking-section" className="hover:text-gold transition-colors">{TRANSLATIONS[lang].navBook}</a>
                </li>
                <li>
                  <a href="#contact-section" className="hover:text-gold transition-colors">{TRANSLATIONS[lang].navContact}</a>
                </li>
              </ul>
            </div>

            {/* Legal / Info Column */}
            <div className="text-right sm:text-left md:text-right">
              <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-4 font-serif">
                {lang === 'ar' ? 'التفاصيل القانونية' : 'Legal Policies'}
              </h5>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                {lang === 'ar' ? 'جميع الأسعار المعروضة شاملة الضريبة الرسمية ورسوم الخدمة اليومية.' : 'All displayed charges include local administrative taxes.'}
              </p>
              <div className="flex items-center justify-start md:justify-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1e1e1e] flex items-center justify-center border border-gold/20 text-gold text-[10px] font-bold font-serif">Q</span>
                <span className="w-6 h-6 rounded-full bg-[#1e1e1e] flex items-center justify-center border border-stone-800 text-stone-400 text-[10px] font-bold font-serif">H</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright segment */}
          <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 text-center gap-4">
            <p>© 2026 Queen Hotel. {TRANSLATIONS[lang].footerRights}</p>
            <div className="flex items-center gap-4">
              <a href="#home" className="hover:text-gold transition-colors">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
              <span className="text-stone-800">|</span>
              <a href="#home" className="hover:text-gold transition-colors">{lang === 'ar' ? 'الأحكام والشروط' : 'Terms & Conditions'}</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
