import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Menggunakan useEffect untuk menavigasi ke layar berikutnya setelah beberapa detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth'); // Ganti 'Login' dengan nama layar utama yang Anda inginkan
    }, 3000); // Ubah durasi splash screen sesuai kebutuhan (dalam milidetik)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Ganti dengan path gambar splash screen Anda
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0D7D5', // Warna latar belakang sesuai kebutuhan
  },
  logo: {
    width: '80%', // Sesuaikan lebar logo sesuai kebutuhan
  },
});
