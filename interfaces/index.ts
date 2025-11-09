import { ReactNode } from 'react';

export interface CardProps {
  imageUrl: string;
  title: string;
  location: string;
  price: number;
  description: string;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

// export interface PropertyProps {
//   id: number;
//   name: string;
//   address: {
//     state: string;
//     city: string;
//     country: string;
//   };
//   rating: number;
//   category: string[];
//   price: number;
//   offers: {
//     bed: string;
//     shower: string;
//     occupants: string;
//   };
//   image: string;
//   images?: string[];
//   discount?: string;
//   description: string;
//   reviews: {
//     name: string;
//     avatar: string;
//     rating: number;
//     comment: string;
//   }[]
// }

export interface PropertyProps {
  id: number;
  title: string;
  description: string;
  avg_rating: number;
  location: string;
  discount?: string;
  category: string[];
  amenities: string[];
  image: string;
  images?: string[];
  price_per_night: number;
  is_available: boolean;
  date_listed: string;
  owner: {
    name: string;
    contact: string;
  };
  reviews: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
   }[]
}

export interface BookingProps {
  bookingDetails: {
    propertyName: string;
    guestName: string;
    guestEmail: string;
    checkInDate: string;
    checkOutDate: string;
    rooms: number;
    feePerNight: number;
    totalNights: number;
  };
}
