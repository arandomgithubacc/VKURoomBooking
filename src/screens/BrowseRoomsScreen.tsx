import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK_ROOMS } from '../data/rooms';
import { useBookingStore } from '../store/useBookingStore';
import type { RootStackParamList, Room } from '../types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function BrowseRoomsScreen() {
  const navigation = useNavigation<Navigation>();
  const searchQuery = useBookingStore((state) => state.searchQuery);
  const selectedBuilding = useBookingStore((state) => state.selectedBuilding);
  const selectedEquipment = useBookingStore((state) => state.selectedEquipment);

  const rooms = MOCK_ROOMS.filter((room) => {
    const matchesSearch = `${room.name} ${room.building}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBuilding =
      selectedBuilding === 'all' || room.building === selectedBuilding;
    const matchesEquipment =
      !selectedEquipment || room.equipment.includes(selectedEquipment);
    return matchesSearch && matchesBuilding && matchesEquipment;
  });

  const renderRoom = ({ item }: { item: Room }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('RoomDetails', { roomId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <Text style={styles.roomName}>{item.name}</Text>
          <View style={[styles.status, item.status !== 'available' && styles.statusMuted]}>
            <Text style={styles.statusText}>
              {item.status === 'available' ? 'Trống' : item.status === 'occupied' ? 'Đang dùng' : 'Bảo trì'}
            </Text>
          </View>
        </View>
        <Text style={styles.meta}>
          {item.building} · Tầng {item.floor} · {item.capacity} chỗ
        </Text>
        <Text numberOfLines={1} style={styles.equipment}>
          {item.equipment.join(' · ')}
        </Text>
        <View style={styles.detailLink}>
          <Text style={styles.detailText}>Xem chi tiết</Text>
          <Ionicons name="arrow-forward" size={16} color="#0b5cab" />
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={renderRoom}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.heading}>Phòng học VKU</Text>}
      ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy phòng phù hợp.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f7fb',
  },
  heading: {
    marginBottom: 14,
    color: '#102a43',
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    overflow: 'hidden',
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardBody: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  roomName: {
    flex: 1,
    color: '#102a43',
    fontSize: 17,
    fontWeight: '700',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#e3f9e5',
  },
  statusMuted: {
    backgroundColor: '#fff3c4',
  },
  statusText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '600',
  },
  meta: {
    marginTop: 7,
    color: '#52606d',
  },
  equipment: {
    marginTop: 8,
    color: '#7b8794',
  },
  detailLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  detailText: {
    marginRight: 5,
    color: '#0b5cab',
    fontWeight: '600',
  },
  empty: {
    paddingTop: 32,
    color: '#52606d',
    textAlign: 'center',
  },
});
