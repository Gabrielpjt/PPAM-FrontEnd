// components/ui/StaffBox.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StaffBox = ({ name, image, deliveries, status, destination, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <StaffImage image={image} />
      </View>
      <View style={styles.rightContent}>
        <StaffName name={name} />
        <StaffStatus status={status == 0 ? "Tidak aktif" : status == 1 ? "Pickup" :status == 2 ? "OTW" :"Delivery"} />
      </View>
    </TouchableOpacity>
  );
};

const StaffImage = ({ image }) => (
  <Image source={{uri:'https://simanis.stei.itb.ac.id/fodex/download/'+image}} style={styles.image} />
);

const StaffName = ({ name }) => (
  <Text style={styles.name}>{name}</Text>
);

const StaffDeliveryInfo = ({ deliveries }) => (
  <View style={styles.deliveryInfo}>
    <FontAwesome name="truck" size={20} color="#FFA500" />
    <Text style={styles.deliveryText}>{deliveries}</Text>
  </View>
);

const StaffStatus = ({ status }) => (
  <Text style={styles.statusText}>{status}</Text>
);

const StaffDestination = ({ destination }) => (
  <Text style={styles.destinationText}>Tujuan: {destination}</Text>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  leftContent: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 18,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
  },
  destinationText: {
    fontSize: 16,
  },
});

export default StaffBox;
