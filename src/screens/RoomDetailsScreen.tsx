import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { MOCK_ROOMS } from '../data/rooms';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomDetails'>;

export default function RoomDetailsScreen({ navigation, route }: Props) {
  const room = MOCK_ROOMS.find((item) => item.id === route.params.roomId);

  if (!room) {
    return <Text style={styles.notFound}>Không tìm thấy phòng.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: room.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.meta}>
        {room.building} · Tầng {room.floor} · Sức chứa {room.capacity} người
      </Text>
      <Text style={styles.sectionTitle}>Thiết bị</Text>
      <Text style={styles.equipment}>{room.equipment.join(' · ')}</Text>
      <Pressable
        style={styles.button}
        disabled={room.status !== 'available'}
        onPress={() => navigation.navigate('BookingForm', { roomId: room.id })}
      >
        <Text style={styles.buttonText}>
          {room.status === 'available' ? 'Chọn thời gian đặt phòng' : 'Phòng hiện không khả dụng'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f7fb',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
  },
  title: {
    marginTop: 18,
    color: '#102a43',
    fontSize: 24,
    fontWeight: '700',
  },
  meta: {
    marginTop: 8,
    color: '#52606d',
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 24,
    color: '#102a43',
    fontSize: 17,
    fontWeight: '700',
  },
  equipment: {
    marginTop: 8,
    color: '#52606d',
    lineHeight: 24,
  },
  button: {
    alignItems: 'center',
    marginTop: 28,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#0b5cab',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  notFound: {
    flex: 1,
    padding: 24,
    color: '#b42318',
  },
});
