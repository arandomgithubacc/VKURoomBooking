import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Booking, Building } from '../types';

interface BookingStore {
  bookings: Booking[];
  searchQuery: string;
  selectedBuilding: Building | 'all';
  selectedEquipment: string | null;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSelectedBuilding: (selectedBuilding: Building | 'all') => void;
  setSelectedEquipment: (selectedEquipment: string | null) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],
      searchQuery: '',
      selectedBuilding: 'all',
      selectedEquipment: null,
      addBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),
      cancelBooking: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== bookingId),
        })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedBuilding: (selectedBuilding) => set({ selectedBuilding }),
      setSelectedEquipment: (selectedEquipment) => set({ selectedEquipment }),
    }),
    {
      name: 'vku-room-booking-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ bookings: state.bookings }),
    },
  ),
);
