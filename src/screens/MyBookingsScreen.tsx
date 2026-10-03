import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useBookingStore } from '../store/useBookingStore';
import type { Booking, RootStackParamList } from '../types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function MyBookingsScreen() {
  const navigation = useNavigation<Navigation>();
  const bookings = useBookingStore((state) => state.bookings);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);

  const confirmCancellation = (booking: Booking) => {
    Alert.alert(
      'Hủy lịch đặt phòng?',
      `Bạn có chắc muốn hủy ${booking.roomName}?`,
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Hủy lịch',
          style: 'destructive',
          onPress: () => cancelBooking(booking.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={bookings.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={52} color="#829ab1" />
            <Text style={styles.emptyTitle}>Chưa có lịch đặt phòng</Text>
            <Text style={styles.emptyText}>
              Các phòng bạn đặt sẽ được hiển thị ở đây.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="business-outline" size={22} color="#0b5cab" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.roomName}>{item.roomName}</Text>
              <Text style={styles.detail}>{item.bookingDate}</Text>
              <Text style={styles.detail}>
                {item.startTime} - {item.endTime}
              </Text>
              {item.purpose ? <Text style={styles.purpose}>{item.purpose}</Text> : null}
              <Pressable
                accessibilityRole="button"
                style={styles.cancelButton}
                onPress={() => confirmCancellation(item)}
              >
                <Ionicons name="close-circle-outline" size={18} color="#b42318" />
                <Text style={styles.cancelText}>Hủy lịch đặt phòng</Text>
              </Pressable>
            </View>
            <Pressable
              accessibilityLabel={`Xem mã QR của ${item.roomName}`}
              hitSlop={10}
              onPress={() =>
                navigation.navigate('BookingConfirmation', { bookingId: item.id })
              }
            >
              <Ionicons name="qr-code-outline" size={24} color="#0b5cab" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  cardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e6f0fa',
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  roomName: {
    color: '#102a43',
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    marginTop: 5,
    color: '#52606d',
  },
  purpose: {
    marginTop: 8,
    color: '#334e68',
    fontStyle: 'italic',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  cancelText: {
    marginLeft: 6,
    color: '#b42318',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: 14,
    color: '#102a43',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 8,
    color: '#52606d',
    textAlign: 'center',
  },
});
