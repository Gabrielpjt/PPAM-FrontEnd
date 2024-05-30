import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Button from '../components/ui/Button';
import HeaderBack from '../components/ui/HeaderBack';
import { Dropdown } from 'react-native-element-dropdown';

const EditPackageScreen = ({ route, navigation }) => {
  const packageItem = route.params.item;
  console.log("meong ")
  console.log(packageItem)
  const [updatedPackage, setUpdatedPackage] = useState({
    id: packageItem.id,
    akun: packageItem.akun,
    bunga: packageItem.bunga,
    nama: packageItem.nama,
    alamat: packageItem.alamat,
    no_telp: packageItem.no_telp,
    kurir: packageItem.kurir,
    status: packageItem.status,
  });

  const [receiverName, setReceiverName] = useState(packageItem.nama);
  const [address, setAddress] = useState(packageItem.alamat);
  const [phoneNumber, setPhoneNumber] = useState(packageItem.no_telp);

  async function handleUpdate() {
    if (true) {
      // Update package
      const body = new FormData();
      body.append('id', updatedPackage.id);
      body.append('status', updatedPackage.status);

      const response = await fetch(`https://simanis.stei.itb.ac.id/fodex/paket`, {
        method: 'PATCH',
        body,
      });

      const res = response.status;
      console.log(res);

      if (res === 200) {
        navigation.goBack();
        Alert.alert('Success', 'Data berhasil diperbarui');
      } else {
        Alert.alert('Error', 'Terjadi kesalahan saat memperbarui data');
      }
    } else {
      Alert.alert('Error', 'Harap isi semua kolom');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <HeaderBack title="Edit Paket" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Text style={styles.label}>Nama Penerima</Text>
        <TextInput
          style={styles.input}
          value={receiverName}
          editable ={false}
          onChangeText={setReceiverName}
          placeholder="Masukkan nama penerima"
        />
        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={address}
          editable ={false}
          onChangeText={setAddress}
          placeholder="Masukkan alamat lengkap"
        />
        <Text style={styles.label}>Nomor Handphone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable ={false}
          keyboardType="phone-pad"
          placeholder="Masukkan nomor handphone"
        />
        <Text style={styles.label}>Status</Text>
        <Dropdown
          data={[
            {label: "Tidak Aktif", value: 0},
            {label: "Pickup", value: 1},
            {label: "OTW", value: 2},
            {label: "Delevery", value: 3},
          ]}
          labelField='label'
          valueField='value'
          value={updatedPackage.status}
          onChange={(text) => {setUpdatedPackage({ ...updatedPackage, status: text.value });}}
        />
        <Button onPress={handleUpdate}>Perbarui</Button>
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

export default EditPackageScreen;
