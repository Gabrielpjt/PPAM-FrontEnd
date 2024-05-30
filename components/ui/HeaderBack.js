import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons if you haven't

const HeaderBack = ({ title, onBack, onEdit }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIconContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between back icon, title, and edit icon
    backgroundColor: '#C0D7D5',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderBack;
