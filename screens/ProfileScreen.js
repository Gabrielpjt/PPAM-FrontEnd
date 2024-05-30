import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Navbar from '../components/ui/Navbar';
import { UsersContext } from '../contexts/UserContext';

const ProfileScreen = ({ navigation }) => {
  const { users } = useContext(UsersContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: `https://simanis.stei.itb.ac.id/fodex/download/${users.foto}` }} 
          style={styles.profileImage} 
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Nama Pengguna: {users.nama}</Text>
          <Text style={styles.detailText}>Nama Toko: {users.nama_toko}</Text>
          <Text style={styles.detailText}>Alamat Toko: {users.alamat}</Text>
          <Text style={styles.detailText}>No. Telepon: {users.no_telp}</Text>
        </View>
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfileScreen;
