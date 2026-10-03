import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK_ROOMS } from '../data/rooms';
import { useBookingStore } from '../store/useBookingStore';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingForm'>;

export default function BookingFormScreen({ navigation, route }: Props) {
  const addBooking = useBookingStore((state) => state.addBooking);
  const room = MOCK_ROOMS.find((item) => item.id === route.params.roomId);

  if (!room) {
    return <Text style={styles.notFound}>Không tìm thấy phòng.</Text>;
  }

  const submitBooking = () => {
    const bookingId = `booking-${Date.now()}`;
    addBooking({
      id: bookingId,
      roomId: room.id,
      roomName: room.name,
      bookingDate: new Date().toLocaleDateString('vi-VN'),
      startTime: route.params.timeSlot?.startTime ?? '08:00',
      endTime: route.params.timeSlot?.endTime ?? '10:00',
      bookedBy: 'Sinh viên VKU',
      purpose: 'Học tập',
      createdAt: new Date().toISOString(),
    });
    navigation.replace('BookingConfirmation', { bookingId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận đặt phòng</Text>
      <Text style={styles.room}>{room.name}</Text>
      <Text style={styles.detail}>08:00 - 10:00 · Hôm nay</Text>
      <Pressable style={styles.button} onPress={submitBooking}>
        <Text style={styles.buttonText}>Xác nhận đặt phòng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f7fb',
  },
  title: {
    color: '#102a43',
    fontSize: 24,
    fontWeight: '700',
  },
  room: {
    marginTop: 24,
    color: '#102a43',
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    marginTop: 8,
    color: '#52606d',
  },
  button: {
    alignItems: 'center',
    marginTop: 32,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0b5cab',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    padding: 24,
    color: '#b42318',
  },
});
