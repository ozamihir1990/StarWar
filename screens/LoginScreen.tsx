import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LoginScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios for API calls
import Logo from './Logo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fetchPlanetData = async (email) => {
    let endpoint = '';

    if (email === 'luke_skywalker@starwars.com') {
      endpoint = 'people/1/';
    } else if (email === 'anakin_skywalker@starwars.com') {
      endpoint = 'planets/3/';
    }

    try {
      const response = await axios.get(`https://swapi.dev/api/${endpoint}`);
      return response.data; // Return the fetched planet data
    } catch (error) {
      console.error('Failed to fetch planet data', error);
      return null;
    }
  };

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('users');
    const users = userData ? JSON.parse(userData) : [];

    // Find the user with matching credentials
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Fetch planet data based on the email
      const planetData = await fetchPlanetData(email);

      if (planetData) {
        // Add planet data to the user object
        const updatedUser = { ...user, planetData };

        // Save updated user data to AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify([...users]));

        // Navigate to the Profile screen with the updated user data
        navigation.navigate('Profile', { user: updatedUser });
      } else {
        setError('Failed to load profile data.');
      }
    } else {
      setError('User not found');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={styles.placeholderTextColor.color}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={styles.placeholderTextColor.color}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
