import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Button from '../components/ui/Button';
import HeaderBack from '../components/ui/HeaderBack';
import { StaffsContext } from '../backup';
import { UsersContext } from '../contexts/UserContext';

const PackingScreen = ({ route, navigation }) => {
  const { flower } = route.params;
  //const { addPackedData } = usePackingContext();
  const { staffs } = useContext(StaffsContext);
  const { users, setUsers } = useContext(UsersContext);
  const [newPaket, setNewPaket] = useState({
    akun: users.id,
    bunga: flower.id,
  });
  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function handleSubmit () {
    if (receiverName && address && phoneNumber) {
      // Upload bunga
      body = new FormData()
      body.append('akun', newPaket.akun)
      body.append('nama', receiverName)
      body.append('bunga', newPaket.bunga)
      body.append('alamat', address)
      body.append('no_telp', phoneNumber)
      body.append('kurir', getRandomInactiveStaffName())
      response = await fetch('https://simanis.stei.itb.ac.id/fodex/paket', {
        method: 'POST',
        body
      })

      res = response.status
      console.log(res);

    navigation.goBack()
      Alert.alert('Success', 'Data berhasil disimpan');
    } else {
      Alert.alert('Error', 'Harap isi semua kolom');
    }
  };

  const getRandomInactiveStaffName = () => {
    if (!staffs) {
      return ''; // or handle the case when staffList is undefined
    }
    const inactiveStaffList = staffs.filter(staff => (staff.status == 0));
    const randomIndex = Math.floor(Math.random() * inactiveStaffList.length);
    return inactiveStaffList[randomIndex]?.nama || '';
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <HeaderBack title="Packing Bunga" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Text style={styles.label}>Nama Penerima</Text>
        <TextInput
          style={styles.input}
          value={receiverName}
          onChangeText={setReceiverName}
          placeholder="Masukkan nama penerima"
        />
        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={address}
          onChangeText={setAddress}
          placeholder="Masukkan alamat lengkap"
        />
        <Text style={styles.label}>Nomor Handphone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Masukkan nomor handphone"
        />
        <Button onPress={handleSubmit}>Packing</Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    alignItems: 'stretch',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default PackingScreen;
