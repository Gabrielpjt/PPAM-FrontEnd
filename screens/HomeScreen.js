import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import Navbar from '../components/ui/Navbar';
import FlowerBox from '../components/ui/FlowerBox';
import Header from '../components/ui/Header';
import { FlowersContext } from '../contexts/FlowerContext';
import { useIsFocused } from '@react-navigation/native';
import { UsersContext } from "../contexts/UserContext";

const HomeScreen = ({ navigation }) => {
  const { flowers, setFlowers } = useContext(FlowersContext);
  const { users, setUsers } = useContext(UsersContext);
  const isFocused = useIsFocused()

  useEffect(() => {
    async function loadStaffs() {
      try {
        // Add form data here if needed
        const response = await fetch('https://simanis.stei.itb.ac.id/fodex/bunga?akun='+ users.id, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedStaffs = await response.json();
        console.log(fetchedStaffs)
        setFlowers(fetchedStaffs);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    console.log("tes")
    console.log(users)
    console.log("tess")
    isFocused && loadStaffs();
  }, [isFocused]);

  // Membuat objek kosong untuk menampung bunga berdasarkan kategori
  const categorizedFlowers = {};

  // Mengelompokkan bunga berdasarkan kategori
  flowers.forEach((flower) => {
    if (!categorizedFlowers[flower.jenis]) {
      categorizedFlowers[flower.jenis] = [];
    }
    categorizedFlowers[flower.jenis].push(flower);
  });

  const handleAddPress = () => {
    navigation.navigate('AddFlower');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#C0D7D5"
      />
      <Header title="Daftar Bunga" onAdd={handleAddPress} />
      <ScrollView style={styles.scrollView}>
        {/* Menampilkan bunga berdasarkan kategori */}
        {Object.keys(categorizedFlowers).map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              {categorizedFlowers[category].map((flower) => (
                <FlowerBox
                  key={flower.id}
                  title={flower.nama}
                  price={flower.harga}
                  stock={flower.stok}
                  image={flower.foto}
                  onPress={() => navigation.navigate('Details', { flower })}
                />
              ))}
            </ScrollView>
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
    marginBottom: 50,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  horizontalScroll: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
