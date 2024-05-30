import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda telah menginstal @expo/vector-icons

const Header = ({ title, onAdd }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onAdd && (
        <Pressable onPress={onAdd} style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C0D7D5',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 5,
  },
});
