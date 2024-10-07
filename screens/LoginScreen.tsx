import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LoginScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logo from './Logo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('users');
    const users = userData ? JSON.parse(userData) : [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${user.name}`);
        const userInfo = response.data.results[0];

        navigation.navigate('Profile', {
          user: {
            ...user,
            height: userInfo.height,
            mass: userInfo.mass,
            birth_year: userInfo.birth_year,
            gender: userInfo.gender,
          },
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data from the Star Wars API.');
      }
    } else {
      setError('User not found');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoWrapper}>
        <Logo />
      </View>

      {/* Login form below */}
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
