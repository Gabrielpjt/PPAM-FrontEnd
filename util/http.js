import axios from 'axios';

const BACKEND_URL =
  'https://console.firebase.google.com/u/0/project/fodex3-4676b/database/fodex3-4676b-default-rtdb/data/~2F';

export async function storeStaf(staffData) {
  const response = await axios.post(BACKEND_URL + '/staffs.json', staffData);
  const id = response.data.name;
  return id;
}

export async function fetchStaffs() {
  const response = await axios.get(BACKEND_URL + '/staffs.json');

  const staffs = [];

  for (const key in response.data) {
    const staffObj = {
      id: key,
      name: response.data[key].name,
      deliveries: response.data[key].deliveries,
      status: response.data[key].status,
      destination: response.data[key].destination,
      gender: response.data[key].gender,
      vehicleNumber: response.data[key].vehicleNumber,
      phone: response.data[key].phone,
    };
    staffs.push(staffObj);
  }

  return staffs;
}

export function updateStaff(id, staffData) {
  return axios.put(BACKEND_URL + `/staffs/${id}.json`, staffData);
}

export function deleteStaff(id) {
  return axios.delete(BACKEND_URL + `/staffs/${id}.json`);
}

export async function storeFlower(flowerData) {
  const response = await axios.post(BACKEND_URL + '/flowers.json', flowerData);
  const id = response.data.name;
  return id;
}

export async function fetchFlowers() {
  const response = await axios.get(BACKEND_URL + '/flowers.json');

  const flowerData = [];

  for (const key in response.data) {
    const flowerObj = {
      id: key,
      title: response.data[key].title,
      category: response.data[key].category,
      price: response.data[key].price,
      stock: response.data[key].stock,
      composition: response.data[key].composition,
      description: response.data[key].description,
    };
    flowerData.push(flowerObj);
  }

  return flowerData;
}

export function updateFlower(id, flowerData) {
  return axios.put(BACKEND_URL + `/flowers/${id}.json`, flowerData);
}

export function deleteFlower(id) {
  return axios.delete(BACKEND_URL + `/flowers/${id}.json`);
}

export async function storePacking(packingData) {
  const response = await axios.post(BACKEND_URL + '/packing.json', packingData);
  const id = response.data.name;
  return id;
}

export async function fetchPacking() {
  const response = await axios.get(BACKEND_URL + '/packing.json');

  const packingData = [];

  for (const key in response.data) {
    const packingObj = {
      id: key,
      name: response.data[key].name,
      quantity: response.data[key].quantity,
      description: response.data[key].description,
    };
    packingData.push(packingObj);
  }

  return packingData;
}

export function updatePacking(id, packingData) {
  return axios.put(BACKEND_URL + `/packing/${id}.json`, packingData);
}

export function deletePacking(id) {
  return axios.delete(BACKEND_URL + `/packing/${id}.json`);
}