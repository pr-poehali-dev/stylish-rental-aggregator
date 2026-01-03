export type UserType = 'client' | 'owner';

export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  amenities: string[];
  available: boolean;
};

export type Booking = {
  id: number;
  propertyTitle: string;
  date: Date;
  hours: number;
  status: 'pending' | 'confirmed' | 'completed';
  total: number;
};
