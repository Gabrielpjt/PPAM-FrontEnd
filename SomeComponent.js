import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { storeStaf, fetchStaffs, updateStaff, deleteStaff } from './util/http'; // Pastikan jalur impor sesuai

function SomeComponent() {
  const [staffs, setStaffs] = useState([]);
  const [newStaff, setNewStaff] = useState({
    id: '',
    name: '',
    deliveries: '',
    status: '',
    destination: '',
    gender: '',
    vehicleNumber: '',
    phone: '',
    photo: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStaffs, setFilteredStaffs] = useState(staffs);

  useEffect(() => {
    async function loadStaffs() {
      const fetchedStaffs = await fetchStaffs();
      setStaffs(fetchedStaffs);
    }
    loadStaffs();
  }, []);

  useEffect(() => {
    setFilteredStaffs(
      staffs.filter(staff =>
        staff.name.toLowerCase().includes((searchQuery || '').toLowerCase())
      )
    );
  }, [searchQuery, staffs]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPath = `${FileSystem.documentDirectory}${result.uri.split('/').pop()}`;
      await FileSystem.copyAsync({ from: result.uri, to: newPath });
      setNewStaff({ ...newStaff, photo: newPath });
    }
  };

  const handleAddStaff = async () => {
    if (newStaff.name && newStaff.phone) {
      const id = await storeStaf(newStaff);
      setStaffs([...staffs, { ...newStaff, id }]);
      setNewStaff({
        id: '',
        name: '',
        deliveries: '',
        status: '',
        destination: '',
        gender: '',
        vehicleNumber: '',
        phone: '',
        photo: null,
      });
    } else {
      Alert.alert('Error', 'Please fill in the required fields.');
    }
  };

  const handleDeleteStaff = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this staff?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: async () => {
          await deleteStaff(id);
          setStaffs(staffs.filter(staff => staff.id !== id));
        }, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateStaff = (id) => {
    Alert.prompt(
      'Update Staff',
      'Update the staff details',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: async (text) => {
            await updateStaff(id, { name: text });
            setStaffs(staffs.map(staff => staff.id === id ? { ...staff, name: text } : staff));
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Staff</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newStaff.name}
        onChangeText={(text) => setNewStaff({ ...newStaff, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={newStaff.phone}
        onChangeText={(text) => setNewStaff({ ...newStaff, phone: text })}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Deliveries"
        value={newStaff.deliveries}
        onChangeText={(text) => setNewStaff({ ...newStaff, deliveries: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={newStaff.status}
        onChangeText={(text) => setNewStaff({ ...newStaff, status: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={newStaff.destination}
        onChangeText={(text) => setNewStaff({ ...newStaff, destination: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={newStaff.gender}
        onChangeText={(text) => setNewStaff({ ...newStaff, gender: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        value={newStaff.vehicleNumber}
        onChangeText={(text) => setNewStaff({ ...newStaff, vehicleNumber: text })}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from gallery</Text>
      </TouchableOpacity>
      {newStaff.photo && <Image source={{ uri: newStaff.photo }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleAddStaff}>
        <Text style={styles.buttonText}>Add Staff</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredStaffs}
        keyExtractor={(staff) => staff.id}
        renderItem={({ item }) => (
            <View style={styles.staffItem}>
            <View>
                <Text>Name: {item.name || ''}</Text>
                <Text>Phone: {item.phone || ''}</Text>
                <Text>Deliveries: {item.deliveries || ''}</Text>
                <Text>Status: {item.status || ''}</Text>
                <Text>Destination: {item.destination || ''}</Text>
                <Text>Gender: {item.gender || ''}</Text>
                <Text>Vehicle Number: {item.vehicleNumber || ''}</Text>
                {item.photo && <Image source={{ uri: item.photo }} style={styles.image} />}
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateStaff(item.id)}>
                <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteStaff(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            </View>
        )}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
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
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  staffItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  updateButton: {
    backgroundColor: '#ffa500',
    padding: 8,
    marginRight: 8,
  },
  updateButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 8,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default SomeComponent;
