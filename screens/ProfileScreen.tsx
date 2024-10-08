import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from '../styles/ProfileScreen.style';
import Logo from './Logo';

const ProfileScreen = ({ route }) => {
  const { user } = route.params; // Destructure user data from the route parameters

  // If no planet data exists, show an error message
  if (!user.planetData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No planet data available for this user.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoWrapper}>
        <Logo />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.title}>{user.planetData.name}'s Profile</Text>

        {/* Display profile photo */}
        <Image
          source={user.profilePhoto ? { uri: user.profilePhoto } : require('../assets/star-wars-logo-1.png')}
          style={styles.photo}
        />

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Height:</Text>
          <Text style={styles.infoValue}>{user.planetData.height} cm</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Mass:</Text>
          <Text style={styles.infoValue}>{user.planetData.mass} kg</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Birth Year:</Text>
          <Text style={styles.infoValue}>{user.planetData.birth_year}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>{user.planetData.gender}</Text>
        </View>

        {/* Display planet information */}
        {user.planetData && (
          <View style={styles.planetContainer}>
            <Text style={styles.planetTitle}>Home Planet</Text>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{user.planetData.name}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Climate:</Text>
              <Text style={styles.infoValue}>{user.planetData.climate}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Population:</Text>
              <Text style={styles.infoValue}>{user.planetData.population}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Terrain:</Text>
              <Text style={styles.infoValue}>{user.planetData.terrain}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
