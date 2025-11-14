export interface Booking {
  id: string;
  guestId: string;
  listingId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfNights: number;
  pricePerNight: number;
  subtotal: number;
  serviceFee: number;
  cleaningFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}
