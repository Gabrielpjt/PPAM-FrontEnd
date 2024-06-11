import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FlowersContext } from '../contexts/FlowerContext';
import HeaderBack from '../components/ui/HeaderBack';
import mime from 'mime';
import { UsersContext } from '../contexts/UserContext';
import axios from 'axios';


const AddFlowerScreen = ({ navigation }) => {
  const { users, setUsers } = useContext(UsersContext);

  const [newFlower, setNewFlower] = useState({
    akun: users.id,
    deskripsi: '',
    foto: '',
    harga: '',
    id: '',
    jenis: '',
    komposisi: '',
    nama: '',
    stok: ''
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    }).then((res) => {
      console.log(res)
      console.log(res.uri)
      setImage(res.uri)
      const file = {
        uri: res.uri,
        name: 'image123.png',
        type: "image/png"
      }
      imgData = new FormData()
      imgData.append('file', file)
      axios.post('https://simanis.stei.itb.ac.id/fodex/upload',imgData, {
        headers: {'Content-Type': 'multipart/form-data'},
        transformRequest: (data) => {return data}
      }).then((res) => {
        setNewFlower({ ...newFlower, foto: res.data })
        console.log(res.data)
        console.log(res.status)
      })
    }).catch(error => console.log(error))
  };

  async function handleAdd() {

    // Upload bunga
    body = new FormData()
    body.append('akun', newFlower.akun)
    body.append('nama', newFlower.nama)
    body.append('jenis', newFlower.jenis)
    body.append('harga', newFlower.harga)
    body.append('deskripsi', newFlower.deskripsi)
    body.append('komposisi', newFlower.komposisi)
    body.append('foto', "555026841dd608196bc201d1246f15d0.png")
    body.append('stok', newFlower.stok)
    response = await fetch('https://simanis.stei.itb.ac.id/fodex/bunga', {
      method: 'POST',
      body
    })

    res = response.status

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#C0D7D5"
      />
      <HeaderBack title="Tambah Bunga" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Nama Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.title}
            onChangeText={text => setNewFlower({ ...newFlower, nama: text })}
          />

          <Text style={styles.label}>Jenis Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.category}
            onChangeText={text => setNewFlower({ ...newFlower, jenis: text })}
          />

          <Text style={styles.label}>Harga Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.price}
            onChangeText={text => setNewFlower({ ...newFlower, harga: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Stock Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.stock}
            onChangeText={text => setNewFlower({ ...newFlower, stok: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Komposisi Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.composition}
            onChangeText={text => setNewFlower({ ...newFlower, komposisi: text })}
          />

          <Text style={styles.label}>Deskripsi Bunga:</Text>
          <TextInput
            style={styles.input}
            value={newFlower.description}
            onChangeText={text => setNewFlower({ ...newFlower, deskripsi: text })}
            multiline
          />
          <Text style={styles.label}>{newFlower.foto}</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Upload Foto Bunga</Text>
          </TouchableOpacity>

          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Tambah Bunga</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollViewContent: {
    padding: 20,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#C0D7D5',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#C0D7D5',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 4,
  },
});

export default AddFlowerScreen;
