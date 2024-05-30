// DetailScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HeaderBack from '../components/ui/HeaderBack';
import Button from '../components/ui/Button'; // Import komponen tombol yang baru

const DetailScreen = ({ route, navigation }) => {
  const { flower } = route.params;

  const handlePackingPress = () => {
    navigation.navigate('Packing', { flower }); // Mengirim data bunga ke PackingScreen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBack title="Detail Bunga" onBack={() => navigation.goBack()} onEdit = {()=> navigation.navigate('UpdateFlower', { flower }) } />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{uri:'https://simanis.stei.itb.ac.id/fodex/download/'+ flower.foto}} style={styles.image} />
        <Text style={styles.title}>{flower.nama}</Text>
        <Text style={styles.price}>{flower.harga}</Text>
        <Text style={styles.composition}>{flower.komposisi}</Text>
        <Text style={styles.description}>{flower.deskripsi}</Text>
      </ScrollView>
      <Button onPress={handlePackingPress}>Packing</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 64, // Sesuaikan dengan tinggi header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#888888',
    marginBottom: 10,
  },
  composition: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailScreen;
