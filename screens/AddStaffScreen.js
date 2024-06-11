// screens/AddStaffScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StaffsContext } from '../contexts/StaffContext';
import HeaderBack from '../components/ui/HeaderBack';
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { UsersContext } from '../contexts/UserContext';


const AddStaffScreen = ({ navigation }) => {
  const { addStaff } = useContext(StaffsContext);
  const { users, setUsers } = useContext(UsersContext);

  const [newStaff, setNewStaff] = useState({
    akun: users.id,
    id: '',
    jk: 0,
    nama: '',
    no_telp: '',
    nopol: '',
    status: 0,
    foto: '',
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
      console.log(image)
    }
  };

  async function handleAddStaff() {
    // Upload foto
    if (image != undefined) {
      console.log("img "+image)
      const file = {
        uri: image,
        name: 'image123.jpg',
        type: mime.getType(image)
      }
      console.log(file)
      body = new FormData()
      body.append('file', file)
      response = await fetch('https://simanis.stei.itb.ac.id/fodex/upload', {
        method: 'POST',
        body,
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      imgName = await response.text()
      console.log("imgname "+imgName)
    } else {
     imgName = ""
     console.log("imgnamee "+imgName)
    }

    // Upload bunga
    body = new FormData()
    body.append('akun', newStaff.akun)
    body.append('id', newStaff.id)
    body.append('jk', newStaff.jk)
    body.append('nama', newStaff.nama)
    body.append('no_telp', newStaff.no_telp)
    body.append('nopol', newStaff.nopol)
    body.append('status', newStaff.status)
    body.append('foto', "607a3276a6cffc1ab62403fe176b9b8d.png")
    response = await fetch('https://simanis.stei.itb.ac.id/fodex/kurir', {
      method: 'POST',
      body
    })

    res = response.status
    console.log(res);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <HeaderBack title="Add Staff" onBack={() => navigation.goBack()} />
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
              value={newStaff.name}
              onChangeText={(text) => setNewStaff({ ...newStaff, nama: text })}
            />
            <Text style={styles.label}>Gender</Text>
            <Dropdown
              data={[
                {label: "Laki-laki", value: 0},
                {label: "Perempuan", value: 1}
              ]}
              labelField='label'
              valueField='value'
              value={newStaff.jk}
              onChange={(text) => {setNewStaff({ ...newStaff, jk: text.value });}}
            />
            <Text style={styles.label}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Vehicle Number"
              value={newStaff.vehicleNumber}
              onChangeText={(text) => setNewStaff({ ...newStaff, nopol: text })}
            />
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={newStaff.phone}
              onChangeText={(text) => setNewStaff({ ...newStaff, no_telp: text })}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </TouchableOpacity>
            <Button title="Add Staff" onPress={handleAddStaff} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 64 : 64, // 64 for iOS status bar + header height
    paddingBottom: 20, // Adjust as needed
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
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#999999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default AddStaffScreen;
