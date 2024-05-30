import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../assets/flower.png')} // Ganti dengan path gambar splash screen Anda
          style={styles.logo}
          resizeMode="contain"
        />
        <Text>Daftar Bunga</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Staff')}>
        <Image
          source={require('../../assets/staff.png')} // Ganti dengan path gambar splash screen Anda
          style={styles.logo}
          resizeMode="contain"
        />
        <Text>Daftar Staff</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Track')}>
        <Image
          source={require('../../assets/track.png')} // Ganti dengan path gambar splash screen Anda
          style={styles.logo}
          resizeMode="contain"
        />
        <Text>Track</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../../assets/profile.png')} // Ganti dengan path gambar splash screen Anda
          style={styles.logo}
          resizeMode="contain"
        />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
    marginHorizontal: 20, // Sesuaikan dengan jarak yang diinginkan antara setiap item
  },
  logo: {
    width: 24, // Sesuaikan dengan lebar gambar
    height: 24, // Sesuaikan dengan tinggi gambar
  },
});

export default Navbar;
