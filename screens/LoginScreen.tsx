import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LoginScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('users');
    const users = userData ? JSON.parse(userData) : [];

    // Find the user with matching credentials
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Navigate to the Profile screen with the user data
      navigation.navigate('Profile', { user });
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
