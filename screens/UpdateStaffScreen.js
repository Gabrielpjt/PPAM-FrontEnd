import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StaffsContext } from '../contexts/StaffContext';
import HeaderBack from '../components/ui/HeaderBack';
import * as ImagePicker from 'react-native-image-picker';
import mime from 'mime';
import { Dropdown } from 'react-native-element-dropdown';

const UpdateStaffScreen = ({ navigation, route }) => {
  const { staff } = route.params;
  const { updateStaff } = useContext(StaffsContext);

  const [updatedStaff, setUpdatedStaff] = useState({
    akun: staff.akun,
    id: staff.id,
    jk: staff.jk,
    nama: staff.nama,
    no_telp: staff.no_telp,
    nopol: staff.nopol,
    foto: staff.foto,
  });
  console.log(updatedStaff)

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (staff.foto) {
      setImage(staff.foto);
    }
  }, [staff]);

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

  async function handleUpdateStaff() {
    let imgName = updatedStaff.foto;

    if (image && image !== updatedStaff.foto) {
      const file = {
        uri: image,
        name: 'image123.jpg',
        type: mime.getType(image),
      };
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('https://simanis.stei.itb.ac.id/fodex/upload', {
        method: 'POST',
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      imgName = await response.text();
    }

    const body = new FormData();
    body.append('id', updatedStaff.id);
    body.append('nama', updatedStaff.nama);
    body.append('nopol', updatedStaff.nopol);
    body.append('status', updatedStaff.status);
    body.append('no_telp', updatedStaff.no_telp);
    body.append('foto', imgName);
    body.append('jk', updatedStaff.jk);
    console.log(body);

    respon = await fetch(`https://simanis.stei.itb.ac.id/fodex/kurir`, {
      method: 'PATCH',
      body,
    });

    res = respon.status
    console.log(res)

    updateStaff({ ...updatedStaff, foto: imgName });
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <HeaderBack title="Update Staff" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updatedStaff.nama}
              onChangeText={(text) => setUpdatedStaff({ ...updatedStaff, nama: text })}
            />
            <Text style={styles.label}>Gender</Text>
            <Dropdown
              data={[
                {label: "Laki-laki", value: 0},
                {label: "Perempuan", value: 1}
              ]}
              labelField='label'
              valueField='value'
              value={updatedStaff.jk}
              onChange={(text) => {setUpdatedStaff({ ...updatedStaff, jk: text.value });}}
            />
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Vehicle Number"
              value={updatedStaff.nopol}
              onChangeText={(text) => setUpdatedStaff({ ...updatedStaff, nopol: text })}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={updatedStaff.no_telp}
              onChangeText={(text) => setUpdatedStaff({ ...updatedStaff, no_telp: text })}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Update Staff" onPress={handleUpdateStaff} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 64 : 64,
    paddingBottom: 20,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default UpdateStaffScreen;
