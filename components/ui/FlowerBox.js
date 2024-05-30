import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const FlowerBox = ({ title, image, price, stock, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image source={{uri:'https://simanis.stei.itb.ac.id/fodex/download/'+image}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.stock}>Stock: {stock}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    width: 180,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  stock: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default FlowerBox;
