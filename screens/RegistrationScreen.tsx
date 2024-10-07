import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../styles/RegistrationScreen.style';

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<any>(null);
  const [error, setError] = useState('');

  // Request camera and storage permissions for Android
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take a profile picture',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'We need access to your storage to select a profile picture from the gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Function to handle profile photo selection
  const handleProfilePhotoSelection = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: openCamera,
        },
        {
          text: 'Gallery',
          onPress: openGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Function to open camera
  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const cameraPermission = await requestCameraPermission();
      if (!cameraPermission) {
        Alert.alert('Camera permission denied');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled taking a photo.');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'An error occurred while taking the photo.');
      } else {
        setProfilePhoto(response.assets[0].uri); // Set the selected photo URI
      }
    });
  };

  // Function to open gallery
  const openGallery = async () => {
    if (Platform.OS === 'android') {
      const storagePermission = await requestStoragePermission();
      if (!storagePermission) {
        Alert.alert('Storage permission denied');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled selecting a photo.');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'An error occurred while selecting the photo.');
      } else {
        setProfilePhoto(response.assets[0].uri); // Set the selected photo URI
      }
    });
  };

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (email && password && profilePhoto) {
      Alert.alert('Registration Successful', `Welcome, ${email}!`);
      setError('');
      // Logic to store user data, including profile photo URI
    } else {
      setError('Please fill all fields and select a profile photo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={styles.placeholderTextColor.color} // Reference to the placeholder style
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={styles.placeholderTextColor.color} // Reference to the placeholder style
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={styles.placeholderTextColor.color} // Reference to the placeholder style
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />

      {/* Show the selected profile photo */}
      {profilePhoto && (
        <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} />
      )}

      {/* Error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Profile photo selection button */}
      <TouchableOpacity style={styles.button} onPress={handleProfilePhotoSelection}>
        <Text style={styles.buttonText}>Select Profile Photo</Text>
      </TouchableOpacity>

      {/* Register button */}
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Link to login screen */}
      <TouchableOpacity onPress={() => Alert.alert('Navigate to Login Screen')}>
        <Text style={styles.link}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;