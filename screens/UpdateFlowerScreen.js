import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FlowersContext } from '../contexts/FlowerContext';
import HeaderBack from '../components/ui/HeaderBack';
import mime from 'mime';

const UpdateFlowerScreen = ({ navigation, route }) => {
  const { flower } = route.params; // Get flower data from route params
  const { updateFlower } = useContext(FlowersContext);

  const [updatedFlower, setUpdatedFlower] = useState({
    akun: flower.akun,
    deskripsi: flower.deskripsi,
    foto: flower.foto,
    harga: flower.harga,
    id: flower.id,
    jenis: flower.jenis,
    komposisi: flower.komposisi,
    nama: flower.nama,
    stok: flower.stok
  });
  console.log(updatedFlower);

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (flower.foto) {
      setImage(flower.foto);
    }
  }, [flower]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function handleUpdate() {
    let imgName = updatedFlower.foto;

    if (image && image !== updatedFlower.foto) {
      const file = {
        uri: image,
        name: 'image123.jpg',
        type: mime.getType(image)
      };
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('https://simanis.stei.itb.ac.id/fodex/upload', {
        method: 'POST',
        body,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      imgName = await response.text();
    }

    const body = new FormData();
    body.append('akun', updatedFlower.akun);
    body.append('nama', updatedFlower.nama);
    body.append('jenis', updatedFlower.jenis);
    body.append('harga', updatedFlower.harga);
    body.append('id', updatedFlower.id)
    body.append('deskripsi', updatedFlower.deskripsi);
    body.append('komposisi', updatedFlower.komposisi);
    body.append('foto', imgName);
    body.append('stok', updatedFlower.stok);

    response = await fetch(`https://simanis.stei.itb.ac.id/fodex/bunga`, {
      method: 'PATCH',
      body
    });
    res = response.status
    console.log(res)

    updateFlower({ ...updatedFlower, foto: imgName });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor="#C0D7D5"
      />
      <HeaderBack title="Update Bunga" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Nama Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.nama}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, nama: text })}
          />

          <Text style={styles.label}>Jenis Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.jenis}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, jenis: text })}
          />

          <Text style={styles.label}>Harga Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.harga.toString()}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, harga: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Stock Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.stok.toString()}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, stok: text })}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Komposisi Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.komposisi}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, komposisi: text })}
          />

          <Text style={styles.label}>Deskripsi Bunga:</Text>
          <TextInput
            style={styles.input}
            value={updatedFlower.deskripsi}
            onChangeText={text => setUpdatedFlower({ ...updatedFlower, deskripsi: text })}
            multiline
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Upload Foto Bunga</Text>
          </TouchableOpacity>

          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Bunga</Text>
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

export default UpdateFlowerScreen;
