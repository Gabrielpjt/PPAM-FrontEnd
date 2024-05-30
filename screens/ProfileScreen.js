// screens/DetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../components/ui/Navbar';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
      <Navbar navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;
