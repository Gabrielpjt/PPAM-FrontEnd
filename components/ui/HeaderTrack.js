import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderTrack = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C0D7D5',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HeaderTrack;
