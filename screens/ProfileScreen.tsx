import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/ProfileScreen.style';
import Logo from './Logo';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
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
      <ScrollView>
      {user.planetData && (
      <View style={styles.profileContainer}>
        <Text style={styles.title}>{user.planetData.name}'s Profile</Text>

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

        <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Planet Name:</Text>
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

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Gravity:</Text>
              <Text style={styles.infoValue}>{user.planetData.gravity}</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Diameter:</Text>
              <Text style={styles.infoValue}>{user.planetData.diameter} km</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Orbital Period:</Text>
              <Text style={styles.infoValue}>{user.planetData.orbital_period} days</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Rotation Period:</Text>
              <Text style={styles.infoValue}>{user.planetData.rotation_period} hours</Text>
            </View>

            <View style={styles.infoWrapper}>
              <Text style={styles.infoLabel}>Surface Water:</Text>
              <Text style={styles.infoValue}>{user.planetData.surface_water}%</Text>
            </View>
      </View>)}
    </ScrollView>

    </View>
  );
};

export default ProfileScreen;
