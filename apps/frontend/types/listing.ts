export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  propertyType: string;
  neighborhood: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  hostId: string;
}
