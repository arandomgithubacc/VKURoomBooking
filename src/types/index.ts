export type Building = 'Tòa A' | 'Tòa B' | 'Tòa C' | 'Tòa V';

export type RoomStatus = 'available' | 'occupied' | 'maintenance';

export interface Room {
  id: string;
  name: string;
  building: Building;
  floor: number;
  capacity: number;
  equipment: string[];
  imageUrl: string;
  status: RoomStatus;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  bookedBy: string;
  purpose?: string;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  RoomDetails: { roomId: string };
  BookingForm: { roomId: string; timeSlot?: TimeSlot };
  BookingConfirmation: { bookingId: string };
};

export type TabParamList = {
  BrowseRooms: undefined;
  MyBookings: undefined;
  Profile: undefined;
};
