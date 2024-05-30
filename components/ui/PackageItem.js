import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PackageItem = ({ flowerImage, flowerName, receiverName, phoneNumber, address, senderName, status, onEdit }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://simanis.stei.itb.ac.id/fodex/download/' + flowerImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.detailText}>Nama Bunga: {flowerName}</Text>
        <Text style={styles.detailText}>Nama Penerima: {receiverName}</Text>
        <Text style={styles.detailText}>No Telepon: {phoneNumber}</Text>
        <Text style={styles.detailText}>Alamat Tujuan: {address}</Text>
        <Text style={styles.detailText}>Nama Pengirim: {senderName}</Text>
        <Text style={styles.detailText}>Status: {status}</Text>
      </View>
      <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center', // Align items in the center vertically
  },
  image: {
    width: 100,
    height: 100, // Adjust this based on your design
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    padding: 10,
  },
});

export default PackageItem;
