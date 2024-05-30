// screens/StaffScreen.js
import React, {useContext, useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import Navbar from '../components/ui/Navbar';
import StaffBox from '../components/ui/StaffBox';
import Header from '../components/ui/Header';
import { StaffsContext } from '../contexts/StaffContext';
import { useIsFocused } from '@react-navigation/native';
import { UsersContext } from '../contexts/UserContext';

const StaffScreen = ({ navigation }) => {
  const { staffs, setStaffs } = useContext(StaffsContext);
  const isFocused = useIsFocused()
  const { users, setUsers } = useContext(UsersContext);

  useEffect(() => {
    async function loadStaffs() {
      try {
        // Add form data here if needed
        const response = await fetch('https://simanis.stei.itb.ac.id/fodex/kurir?akun='+users.id, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedStaffs = await response.json();
        console.log(fetchedStaffs)
        setStaffs(fetchedStaffs);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    isFocused && loadStaffs();
  }, [isFocused]);


  const handleAddPress = () => {
    navigation.navigate('AddStaff');
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#C0D7D5"
      />
      <Header title="Daftar Staff" onAdd={handleAddPress} />
      <ScrollView style={styles.scrollView}>
        {staffs.map((staff) => (
          <View key={staff.id} style={styles.staffContainer}>
            <StaffBox
              name={staff.nama}
              image={staff.foto}
              deliveries={staff.jk}
              status={staff.status}
              onPress={() => navigation.navigate('DetailsStaff', { staff })}
            />
          </View>
        ))}
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  staffContainer: {
    marginBottom: 20,
  },
});

export default StaffScreen;
