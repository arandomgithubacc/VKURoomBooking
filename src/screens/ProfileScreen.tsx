import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={34} color="#ffffff" />
      </View>
      <Text style={styles.name}>Sinh viên VKU</Text>
      <Text style={styles.email}>student@vku.udn.vn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 72,
    backgroundColor: '#f4f7fb',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#0b5cab',
  },
  name: {
    marginTop: 18,
    color: '#102a43',
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    marginTop: 6,
    color: '#52606d',
  },
});
