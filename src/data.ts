import { Room, Amenity, Testimonial, GalleryItem } from './types';

export const ROOMS: Room[] = [
  {
    id: 'deluxe',
    nameAr: 'غرفة ديلوكس',
    nameEn: 'Deluxe Room',
    descriptionAr: 'غرفة ديلوكس أنيقة تجمع بين الراحة والرفاهية لتستمتع بإقامة هادئة ومميزة.',
    descriptionEn: 'An elegant Deluxe room that blends comfort and luxury for a serene and custom stay.',
    price: 4150,
    featuresAr: [
      'سرير كبير فاخر',
      'تكييف هواء ذكي',
      'واي فاي مجاني سريع',
      'حمام خاص فاخر',
      'خدمة غرف على مدار الساعة'
    ],
    featuresEn: [
      'Luxurious King-size bed',
      'Smart air conditioning',
      'Free high-speed Wi-Fi',
      'Private luxury bathroom',
      '24/7 Premium room service'
    ],
    image: '/src/assets/images/queen_hotel_deluxe_1781080843862.png',
    capacity: 2
  },
  {
    id: 'suite',
    nameAr: 'جناح تنفيذي',
    nameEn: 'Executive Suite',
    descriptionAr: 'جناح فسيح يتميز بإطلالة ساحرة ومنطقة جلوس راقية ليوفر لك تجربة إقامة ملكية متكاملة.',
    descriptionEn: 'A spacious suite featuring a mesmerizing view and elegant seating area to provide an all-inclusive royal experience.',
    price: 7500,
    featuresAr: [
      'مساحة أكبر لراحة قصوى',
      'إطلالة مميزة على معالم المدينة',
      'منطقة جلوس وصالون راقي',
      'خدمات ضيافة وترحيب متكاملة',
      'آلة تحضير القهوة الفاخرة'
    ],
    featuresEn: [
      'Larger space for ultimate comfort',
      'Stunning city landmark view',
      'Refined seating area and lounge',
      'Full VIP welcome treatment',
      'Premium espresso machine'
    ],
    image: '/src/assets/images/queen_hotel_suite_1781080855664.png',
    capacity: 2
  },
  {
    id: 'family',
    nameAr: 'غرفة عائلية',
    nameEn: 'Family Room',
    descriptionAr: 'الملاذ المثالي للعائلات حيث المساحة الواسعة والأسرّة المتعددة لتوفير أقصى درجات الراحة والجودة.',
    descriptionEn: 'The perfect sanctuary for families, featuring ample space and multiple beds to provide the ultimate comfort.',
    price: 5800,
    featuresAr: [
      'مناسبة ومتسعة للعائلات',
      'أسرّة مريحة متعددة',
      'راحة ومساحة إضافية للجميع',
      'شاشة تلفزيون ذكية كبيرة',
      'ثلاجة صغيرة وخزنة مدمجة'
    ],
    featuresEn: [
      'Perfectly spacious for families',
      'Multiple luxury premium beds',
      'Extra comfort and space for all',
      'Large smart entertainment TV',
      'Mini bar and built-in safe'
    ],
    image: '/src/assets/images/queen_hotel_family_1781080882764.png',
    capacity: 4
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'comfort',
    nameAr: 'إقامة مريحة',
    nameEn: 'Comfortable Stay',
    iconName: 'BedDouble',
    descriptionAr: 'غرف مكيفة ومجهزة بالكامل بأرقى قطع الأثاث والشاشات لضمان أقصى درجات الراحة والاسترخاء للنزلاء.',
    descriptionEn: 'Fully air-conditioned rooms styled with premium furniture and modern amenities to guarantee relaxation.'
  },
  {
    id: 'location',
    nameAr: 'موقع استراتيجي',
    nameEn: 'Strategic Location',
    iconName: 'MapPin',
    descriptionAr: 'يقع فندق كوين في قلب الفيوم، بالقرب من أهم المعالم الإدارية، السياحية، والخدمات لسهولة تحركاتك.',
    descriptionEn: 'Situated in the absolute heart of Fayoum, close to major historical landmarks, shopping districts, and administrative areas.'
  },
  {
    id: 'room-service',
    nameAr: 'خدمة غرف مميزة',
    nameEn: 'Excellent Room Service',
    iconName: 'Sparkles',
    descriptionAr: 'فريق متخصص من المحترفين جاهز لتلبية طلباتك وخدمتك بحب واهتمام بأدق التفاصيل على مدار الساعة.',
    descriptionEn: 'A highly trained, dedicated team is at your command 24/7, attending to all requests with professional grace.'
  },
  {
    id: 'wifi',
    nameAr: 'واي فاي مجاني',
    nameEn: 'Free High-Speed Wi-Fi',
    iconName: 'Wifi',
    descriptionAr: 'شبكة إنترنت لاسلكية سريعة ومستقرة تغطي جميع أنحاء الفندق والغرف لتظل متصلاً بأعمالك وأحبائك دائمًا.',
    descriptionEn: 'High-speed, stable wireless connection covering some and all rooms and common areas at all times.'
  },
  {
    id: 'reception',
    nameAr: 'استقبال 24 ساعة',
    nameEn: '24-Hour Reception',
    iconName: 'Clock',
    descriptionAr: 'موظفو الاستقبال مستعدون للترحيب بكم وتسهيل إجراءات الدخول والخروج والإجابة على أي تساؤلات في أي وقت.',
    descriptionEn: 'Warm receptionists ready to check you in/out, assist you with reservations, and handle any emergency round the clock.'
  },
  {
    id: 'shuttle',
    nameAr: 'نقل من وإلى المطار',
    nameEn: 'Airport Shuttle',
    iconName: 'Car',
    descriptionAr: 'رحلات نقل مريحة وآمنة بأسطول حديث من السيارات لتجعل وصولك ومغادرتك من وإلى الفندق أكثر سلاسة.',
    descriptionEn: 'Comfortable, safe point-to-point private transfers with modern vehicles to make your arrivals effortless.'
  }
];

export const FEATURES: { ar: string; en: string }[] = [
  { ar: 'واي فاي مجاني وسريع في كافة المناطق', en: 'Free high-speed Wi-Fi in all areas' },
  { ar: 'تكييف هواء ذكي هادئ في جميع الغرف', en: 'Quiet smart air conditioning in all rooms' },
  { ar: 'استقبال وخدمة نزلاء على مدار 24 ساعة', en: '24-Hour reception & guest support' },
  { ar: 'خدمة غسيل وكي ملابس سريعة ومميزة', en: 'Premium express laundry & ironing service' },
  { ar: 'خدمة غرف وتنظيف يومي للغرف', en: 'Daily housekeeping & dedicated room service' },
  { ar: 'أقسام ومساحات مثالية وتسهيلات للعائلات', en: 'Perfect layouts and amenities for families' },
  { ar: 'تنسيق ونقل خاص وآمن من وإلى المطار', en: 'Safe airport transfers pre-arranged' },
  { ar: 'موقع مميز وجذاب بوسط مدينة الفيوم', en: 'Strategic premium city center location' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    nameAr: 'أحمد فتحي',
    nameEn: 'Ahmed Fathy',
    rating: 5,
    commentAr: 'فندق هادئ جدا وموقع ممتاز والخدمة سريعة والغرف على مستوى راق ونظيف جداً. تجربة تستحق التكرار في الفيوم.',
    commentEn: 'Very quiet hotel, strategic location, fast service, and the rooms are upscale and clean. Truly worth repeating in Fayoum.',
    date: '2026-05-15'
  },
  {
    id: 'review-2',
    nameAr: 'منى الجيار',
    nameEn: 'Mona El-Gayar',
    rating: 5,
    commentAr: 'إقامة مريحة للغاية، وتعامل راق محترم جداً من موظفي الاستقبال وخدمة الغرف. النظافة ممتازة والسرير مريح جداً.',
    commentEn: 'Remarkably comfortable stay and highly professional treatment from some and all reception staff. Impeccable cleanliness.',
    date: '2026-06-02'
  },
  {
    id: 'review-3',
    nameAr: 'محمد عبد الرحمن',
    nameEn: 'Mohamed Abdelrahman',
    rating: 5,
    commentAr: 'أفضل خيار للإقامة في الفيوم من حيث الموقع والخدمة. قريب جدا من كل المطاعم والخدمات الهامة بالمدينة.',
    commentEn: 'Hands down the best stay in Fayoum in terms of service and centrality. Close to all key business and food spots.',
    date: '2026-06-08'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    categoryAr: 'الواجهة الرئيسية',
    categoryEn: 'Main Facade',
    image: '/src/assets/images/queen_hotel_hero_1781080829857.png',
    titleAr: 'واجهة الفندق الملكية في وقت الغروب',
    titleEn: 'Royal facade of the hotel at golden sunset'
  },
  {
    id: 'gal-2',
    categoryAr: 'الاستقبال الفاخر',
    categoryEn: 'Luxury Reception',
    image: '/src/assets/images/queen_hotel_lobby_1781080867289.png',
    titleAr: 'صالة الاستقبال الفخمة والمصممة بلمسات ملكية',
    titleEn: 'Luxurious reception lobby designed with royal gold touches'
  },
  {
    id: 'gal-3',
    categoryAr: 'الغرف والأجنحة',
    categoryEn: 'Rooms & Suites',
    image: '/src/assets/images/queen_hotel_deluxe_1781080843862.png',
    titleAr: 'غرفة ديلوكس مجهزة بأحدث سبل الراحة الفاخرة',
    titleEn: 'Deluxe room equipped with modern high-end assets'
  },
  {
    id: 'gal-4',
    categoryAr: 'الغرف والأجنحة',
    categoryEn: 'Rooms & Suites',
    image: '/src/assets/images/queen_hotel_suite_1781080855664.png',
    titleAr: 'الجناح التنفيذي بإطلالته الرائعة ومنطقة الجلوس المترفة',
    titleEn: 'Executive suite with modern styling and view'
  },
  {
    id: 'gal-5',
    categoryAr: 'المطعم والخدمات',
    categoryEn: 'Restaurant & Services',
    image: '/src/assets/images/queen_hotel_family_1781080882764.png',
    titleAr: 'الغرفة العائلية الفسيحة المصممة للأسر والعطلات',
    titleEn: 'Spacious family room designed for holiday relaxation'
  }
];

export const TRANSLATIONS = {
  ar: {
    brandName: 'فندق كوين',
    subBrandName: 'Queen Hotel',
    slogan: 'راحة ملكية في قلب الفيوم',
    navHome: 'الرئيسية',
    navRooms: 'الغرف',
    navAmenities: 'الميزات',
    navBook: 'الحجز',
    navContact: 'التواصل',
    navGallery: 'معرض الصور',
    navMyBookings: 'حجوزاتي',
    
    heroTitle: 'استمتع بإقامة ملكية في قلب الفيوم',
    heroDescription: 'فندق كوين يجمع بين الراحة والفخامة والموقع المتميز ليمنحك تجربة إقامة استثنائية سواء كنت في رحلة عمل أو عطلة عائلية. غرف أنيقة وخدمة راقية واهتمام بأدق التفاصيل.',
    btnBookNow: 'احجز إقامتك الآن',
    btnContactUs: 'تواصل معنا',
    
    whyChooseTitle: 'لماذا فندق كوين؟',
    whyChooseSub: 'خدمات ضيافة ممتازة ومصممة بأعلى معايير الإتقان والجودة لتلائم رغباتكم',
    
    roomsTitle: 'غرفنا وأجنحتنا الفاخرة',
    roomsSub: 'اختر غرفتك المثالية المصممة بعناية لتوفر لك أجواءً من الفخامة والاسترخاء المطلق',
    priceStarting: 'ابتداءً من',
    egpDay: 'جنيه / ليلة',
    btnBookRoom: 'احجز هذه الغرفة',
    capacityLabel: 'السعة القصوى:',
    guestsCountName: 'نزلاء',
    
    amenitiesTitle: 'خدمات تليق بالملوك',
    amenitiesSub: 'نحن فخورون بتقديم مجموعة قيمة من الخدمات لتوفير إقامة مريحة متكاملة',
    
    testimonialsTitle: 'آراء النزلاء والضيوف',
    testimonialsSub: 'شهادات نعتز بها من ضيوفنا الكرام الذين عاشوا تجربة الإقامة في فندق كوين',
    
    galleryTitle: 'معرض الصور الملكية',
    gallerySub: 'جولة بصرية سريعة في أرجاء فندق كوين لترى تفاصيل الفخامة بنفسك',
    filterAll: 'الكل',
    
    bookingTitle: 'احجز إقامتك الآن',
    bookingSub: 'املأ الاستمارة أدناه لتأكيد حجزك وسنتصل بك فوراً لترتيب إقامتك الملكية',
    formName: 'الاسم الكامل',
    formPhone: 'رقم الهاتف المتنقل',
    formPhonePlaceholder: 'مثال: 01xxxxxxxxx',
    formCheckIn: 'تاريخ الوصول',
    formCheckOut: 'تاريخ المغادرة',
    formRoomType: 'نوع الغرفة أو الجناح',
    formGuests: 'عدد النزلاء والضيوف',
    formGuestsPlaceholder: 'اختر عدد النزلاء',
    btnConfirmBooking: 'تأكيد الحجز الملكي الآن',
    bookingSuccess: 'تهانينا! تم تسجيل طلب الحجز بنجاح. رقم حجزك هو: ',
    bookingSuccessSub: 'سيقوم فريق علاقات النزلاء بالتواصل معك هاتفياً على الرقم المقدم لتأكيد التفاصيل النهائية.',
    myBookingsTitle: 'حجوزاتك الحالية',
    noBookings: 'ليس لديك أي حجوزات محفوظة بعد. املأ الاستمارة في الأعلى للتسجيل!',
    bookingStatusPending: 'قيد المراجعة والاتصال',
    bookingStatusConfirmed: 'تم التأكيد والموافقة',
    btnCancelBooking: 'إلغاء هذا الحجز',
    totalPrice: 'السعر الإجمالي المتوقع',
    deleteSuccess: 'تم إلغاء الحجز بنجاح.',
    
    contactTitle: 'تواصل معنا مباشرة',
    contactSub: 'نحن جاهزون للرد على كافة استفساراتكم وتلبية رغباتكم على مدار الساعة',
    addressLabel: 'العنوان الجغرافي',
    addressValue: 'الفيوم – قسم أول الفيوم، بوسط المدينة',
    phoneLabel: 'رقم الهاتف المباشر',
    emailLabel: 'البريد الإلكتروني الرسمي',
    hoursLabel: 'ساعات العمل وخدمة النزلاء',
    hoursValue: 'خدمة العملاء والاستقبال 24 ساعة طوال أيام الأسبوع',
    
    footerSlogan: 'راحة ملكية وخدمة استثنائية في قلب الفيوم',
    footerRights: 'جميع الحقوق محفوظة.',
    footerQuickLinks: 'روابط سريعة'
  },
  en: {
    brandName: 'Queen Hotel',
    subBrandName: 'فندق كوين',
    slogan: 'Royal comfort in the heart of Fayoum',
    navHome: 'Home',
    navRooms: 'Rooms',
    navAmenities: 'Amenities',
    navBook: 'Book Now',
    navContact: 'Contact Us',
    navGallery: 'Gallery',
    navMyBookings: 'My Bookings',
    
    heroTitle: 'Enjoy a Royal Stay in the Heart of Fayoum',
    heroDescription: 'Queen Hotel combines absolute comfort, premium luxury, and a strategic location to reward you with an exceptional stay experience—whether you are on a business travel or a relaxing family holiday.',
    btnBookNow: 'Book Your Stay Now',
    btnContactUs: 'Contact Us',
    
    whyChooseTitle: 'Why Queen Hotel?',
    whyChooseSub: 'Premium hospitality and custom service created with the highest standards',
    
    roomsTitle: 'Our Luxurious Rooms and Suites',
    roomsSub: 'Discover your perfect private space, thoughtfully styled to wrap you in five-star elegance',
    priceStarting: 'Starting at',
    egpDay: 'EGP / Night',
    btnBookRoom: 'Book This Room',
    capacityLabel: 'Max Capacity:',
    guestsCountName: 'Guests',
    
    amenitiesTitle: 'World-Class Amenities',
    amenitiesSub: 'We take pride in delivering comprehensive luxury hospitality to make your journey easier',
    
    testimonialsTitle: 'Guest Testimonials',
    testimonialsSub: 'Our highly valued testimonials from precious guests who lived the Queen Hotel lifestyle',
    
    galleryTitle: 'Royal Photo Gallery',
    gallerySub: 'Embark on a visual journey showcasing the elegant spaces of Queen Hotel',
    filterAll: 'All',
    
    bookingTitle: 'Book Your Booking Now',
    bookingSub: 'Please fill the details below. Our reservation department will follow up with you instantly.',
    formName: 'Full Name',
    formPhone: 'Mobile Phone Number',
    formPhonePlaceholder: 'E.g., 01xxxxxxxxx',
    formCheckIn: 'Check-In Date',
    formCheckOut: 'Check-Out Date',
    formRoomType: 'Room or Suite Type',
    formGuests: 'Number of Guests',
    formGuestsPlaceholder: 'Select guests number',
    btnConfirmBooking: 'Confirm Royal Booking Now',
    bookingSuccess: 'Congratulations! Your booking request was saved. Your booking ID is: ',
    bookingSuccessSub: 'Our booking staff will call you on your provided phone number shortly to verify details.',
    myBookingsTitle: 'Your Current Bookings',
    noBookings: 'No booking reservations found. Submit the reservation form above to book!',
    bookingStatusPending: 'Pending verification call',
    bookingStatusConfirmed: 'Confirmed & finalized',
    btnCancelBooking: 'Cancel Reservation',
    totalPrice: 'Expected Total Price',
    deleteSuccess: 'Reservation cancelled successfully.',
    
    contactTitle: 'Get in Touch Directly',
    contactSub: 'Our front officers and virtual assistance desks are active and greeting you 24/7',
    addressLabel: 'Geographic Address',
    addressValue: 'Fayoum – First Division, Fayoum City Center',
    phoneLabel: 'Direct Line Number',
    emailLabel: 'Official Email Account',
    hoursLabel: 'Operating Hours',
    hoursValue: 'Front desk and guest assistance open 24/7, year-round',
    
    footerSlogan: 'Royal comfort and exceptional service in the heart of Fayoum',
    footerRights: 'All Rights Reserved.',
    footerQuickLinks: 'Quick Links'
  }
};
