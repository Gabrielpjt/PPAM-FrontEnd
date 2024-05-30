// screens/DetailStaffScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import HeaderBack from '../components/ui/HeaderBack';

const DetailStaffScreen = ({ route, navigation }) => {
  const { staff } = route.params;

  if (!staff) {
    return <Text>Error: Staff data not found</Text>;
  }

  return (
    <View style={styles.container}>
      <HeaderBack title="Detail Staff" onBack={() => navigation.goBack()} onEdit = {() => navigation.navigate('UpdateStaff', { staff })} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{uri:'https://simanis.stei.itb.ac.id/fodex/download/'+staff.foto}} style={styles.image} />
        <Text style={styles.name}>{staff.nama}</Text>
        <Text style={styles.info}>ID Staff: {staff.id}</Text>
        <Text style={styles.info}>Jenis Kelamin: {staff.jk == 1 ? "Perempuan" : "Laki-laki"}</Text>
        <Text style={styles.info}>No Kendaraan: {staff.nopol}</Text>
        <Text style={styles.info}>No Telepon: {staff.no_telp}</Text>
        <Text style={styles.info}>Status: {staff.status == 0 ? "Tidak aktif" : (staff.status == 1 ? "Pickup" : (staff.status == 2 ? "OTW" : "Delivery"))}</Text>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingTop: 70, // To account for the header height
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  image: {
    width: width - 40,
    height: width - 40,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default DetailStaffScreen;
