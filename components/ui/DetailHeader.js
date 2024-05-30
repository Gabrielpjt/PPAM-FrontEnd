import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pastikan untuk menginstal expo-vector-icons

const DetailHeader = ({ title, onBackPress, onEditPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onEditPress}>
        <Ionicons name="create" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#C0D7D5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailHeader;
