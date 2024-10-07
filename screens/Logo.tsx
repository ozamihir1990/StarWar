// Logo.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LogoImage from  '../assets/star-wars-logo.svg'
const Logo = () => {
  return (
    <View style={styles.logoContainer}>
        <LogoImage width="100px" height="100px" />
      {/* <Image
        source={require('../assets/star-wars-logo.svg')} // Ensure the path is correct
        style={styles.logo}
        // resizeMode="contain" // Ensures the logo scales properly
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space below the logo
  },
  logo: {
    width: 30, // Adjust width as necessary
    height: 10, // Adjust height as necessary
    // backgroundColor: 'red', // Optional: Add a white background to the logo
    padding: 10,
  },
});

export default Logo;
