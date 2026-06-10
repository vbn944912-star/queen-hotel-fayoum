export interface Room {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number; // in EGP
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  capacity: number;
}

export interface Amenity {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string; // lucide-react icon name
  descriptionAr: string;
  descriptionEn: string;
}

export interface Testimonial {
  id: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  categoryAr: string;
  categoryEn: string;
  image: string;
  titleAr: string;
  titleEn: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomNameAr: string;
  roomNameEn: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  status: 'pending' | 'confirmed';
  bookingDate: string;
}
