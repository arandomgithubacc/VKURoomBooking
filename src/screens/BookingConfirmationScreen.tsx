import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { RootStackParamList } from '../types';
import { useBookingStore } from '../store/useBookingStore';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BookingConfirmation'
>;

export default function BookingConfirmationScreen({
  navigation,
  route,
}: Props) {
  const booking = useBookingStore((state) =>
    state.bookings.find((item) => item.id === route.params.bookingId),
  );

  if (!booking) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="alert-circle-outline" size={48} color="#b42318" />
        <Text style={styles.emptyTitle}>Không tìm thấy thông tin đặt phòng</Text>
        <Pressable style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successIcon}>
        <Ionicons name="checkmark" size={32} color="#ffffff" />
      </View>
      <Text style={styles.title}>Đặt phòng thành công</Text>
      <Text style={styles.subtitle}>
        Xuất trình mã QR này khi check-in tại phòng.
      </Text>

      <View style={styles.ticket}>
        <Text style={styles.roomName}>{booking.roomName}</Text>
        <Text style={styles.detail}>{booking.bookingDate}</Text>
        <Text style={styles.detail}>
          {booking.startTime} - {booking.endTime}
        </Text>
        <View style={styles.divider} />
        <QRCode value={booking.id} size={180} backgroundColor="#ffffff" />
        <Text style={styles.bookingId}>Mã đặt phòng: {booking.id}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.primaryButtonText}>Về danh sách phòng</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f4f7fb',
    padding: 24,
  },
  successIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    marginTop: 12,
    borderRadius: 32,
    backgroundColor: '#16803c',
  },
  title: {
    marginTop: 16,
    color: '#102a43',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    color: '#52606d',
    textAlign: 'center',
  },
  ticket: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  roomName: {
    color: '#102a43',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    marginTop: 6,
    color: '#52606d',
    fontSize: 16,
  },
  divider: {
    width: '100%',
    marginVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d9e2ec',
  },
  bookingId: {
    marginTop: 16,
    color: '#52606d',
    fontSize: 12,
  },
  primaryButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#0b5cab',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f7fb',
  },
  emptyTitle: {
    marginTop: 12,
    color: '#102a43',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
