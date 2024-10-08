import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { styles } from '../styles/RegistrationScreen.style';

const RegistrationScreen = ({ navigation }) => { // Destructure navigation from props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
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
          message:
            'We need access to your storage to select a profile picture from the gallery',
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

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled taking a photo.');
      } else if (response.errorCode) {
        Alert.alert(
          'Error',
          response.errorMessage || 'An error occurred while taking the photo.'
        );
      } else if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri); // Set the selected photo URI
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
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

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled selecting a photo.');
      } else if (response.errorCode) {
        Alert.alert(
          'Error',
          response.errorMessage || 'An error occurred while selecting the photo.'
        );
      } else if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri); // Set the selected photo URI
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    });
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (email && password && profilePhoto) {
      const newUser = { email, password, profilePhoto };
      // Retrieve existing users from AsyncStorage
      let existingUsers = await AsyncStorage.getItem('users');
      existingUsers = existingUsers ? JSON.parse(existingUsers) : [];
      // Save new user data
      await AsyncStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      // Show success message and navigate to Login screen
      Alert.alert('Registration Successful', `Welcome, ${email}!`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Redirect to login screen
        },
      ]);
      setError('');
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
        <Image
          source={{ uri: profilePhoto }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
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
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;