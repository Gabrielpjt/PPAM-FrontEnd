import React , {useContext, useEffect} from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import PackageItem from '../components/ui/PackageItem';
import HeaderTrack from '../components/ui/HeaderBack'; // Import the HeaderBack component
import Navbar from '../components/ui/Navbar'; // Import the Navbar component
import { PackingsContext } from '../contexts/PackingContext';
import { useIsFocused } from '@react-navigation/native';
import { FlowersContext } from '../contexts/FlowerContext';
import { StaffsContext } from '../contexts/StaffContext';
import { UsersContext } from '../contexts/UserContext';

const TrackScreen = ({ navigation }) => { // Pass navigation as a prop
  const { flowers } = useContext(FlowersContext);
  const { staffs } = useContext(StaffsContext);
  const { packings, setPackings } = useContext(PackingsContext);
  const { users, setUsers } = useContext(UsersContext);
  const isFocused = useIsFocused()
  
  console.log(staffs);
  useEffect(() => {
    async function loadStaffs() {
      try {
        // Add form data here if needed
        const response = await fetch('https://simanis.stei.itb.ac.id/fodex/paket?akun='+users.id, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedStaffs = await response.json();
        console.log(fetchedStaffs)
        setPackings(fetchedStaffs);
        console.log(packings)
        console.log("Data fetched successfully");
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    isFocused && loadStaffs();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    console.log(item)
    // Find the flower that matches the current package item
    const flower = flowers.find(flower => flower.id === item.bunga);
    const staff = staffs.find(staff => staff.id === item.kurir);

    // Ensure flower exists to avoid undefined errors
    if (!flower) return null;

    return (
      <PackageItem
        flowerImage={flower.foto}
        flowerName={flower.nama}
        receiverName={item.nama}
        phoneNumber={item.no_telp}
        address={item.alamat}
        senderName={staff ? staff.nama : 'Unknown'}
        status={item.status == 0 ? "Tidak aktif" : (item.status == 1 ? "Pickup" : (item.status == 2 ? "OTW" : "Delivery"))}
        onEdit = {()=> navigation.navigate('EditPackage', { item })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#C0D7D5"
      />
      <HeaderTrack title="Daftar Paket" />
      <FlatList
        data={packings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TrackScreen;
