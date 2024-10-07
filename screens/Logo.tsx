// Logo.tsx
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import LogoImage from  '../assets/star-wars-logo.svg'

const { width } = Dimensions.get('window');
const Logo = () => {
  return (
    <View style={styles.logoContainer}>
        <LogoImage width={width * 0.4} height={width * 0.4} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Logo;
