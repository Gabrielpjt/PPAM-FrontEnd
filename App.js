import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import StaffScreen from './screens/StaffScreen';
import DetailStaffScreen from './screens/DetailStaffScreen';
import AddStaffScreen from './screens/AddStaffScreen';
import UpdateStaffScreen from './screens/UpdateStaffScreen';
import TrackScreen from './screens/TrackScreen';
import EditPackageScreen from './screens/EditPackageScreen';
import ProfileScreen from './screens/ProfileScreen';
import FlowerDetailScreen from './screens/FlowerDetailScreen';
import PackingScreen from './screens/PackingScreen';
import AddFlowerScreen from './screens/AddFlowerScreen';
import UpdateFlowerScreen from './screens/UpdateFlowerScreen';
import FlowersContextProvider from './contexts/FlowerContext';
import StaffContextProvider from './contexts/StaffContext';
import PackingsContextProvider from './contexts/PackingContext';
import UsersContextProvider from './contexts/UserContext';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={FlowerDetailScreen} />
      <Stack.Screen name="Packing" component={PackingScreen} />
      <Stack.Screen name="AddFlower" component={AddFlowerScreen} />
      <Stack.Screen name="UpdateFlower" component={UpdateFlowerScreen} />
      <Stack.Screen name="Staff" component={StaffScreen} />
      <Stack.Screen name="DetailsStaff" component={DetailStaffScreen} />
      <Stack.Screen name="AddStaff" component={AddStaffScreen} />
      <Stack.Screen name="UpdateStaff" component={UpdateStaffScreen} />
      <Stack.Screen name="Track" component={TrackScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditPackage" component={EditPackageScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate loading process (e.g., checking authentication status)
    setTimeout(() => {
      setIsLoading(false);
      // Set isAuthenticated based on your authentication logic
      // For example, check if a token exists in async storage
    }, 2000);
  }, []);

  return (
    <UsersContextProvider>
    <FlowersContextProvider>
      <StaffContextProvider>
        <PackingsContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={AppStack} />
                <Stack.Screen name="Auth" component={AuthStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </PackingsContextProvider>
      </StaffContextProvider>
    </FlowersContextProvider>
    </UsersContextProvider>
  );
}
