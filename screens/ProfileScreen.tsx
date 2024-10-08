import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/ProfileScreen.style';
import Logo from './Logo';

const ProfileScreen = ({ route }) => {
  const { user } = route.params; // Destructure user data from the route parameters

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoWrapper}>
        <Logo />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.title}>{user.email}'s Profile</Text>
        {/* Display profile photo */}
        {/* {user.profilePhoto ? (
          <Image
            source={{ uri: user.profilePhoto }}
            style={styles.photo}
          />
        ) : (
          <Image 
            source={require('../path/to/local/fallback/image.png')}
            style={styles.photo}
          />
        )} */}

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Height:</Text>
          <Text style={styles.infoValue}>{user.height} cm</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Mass:</Text>
          <Text style={styles.infoValue}>{user.mass} kg</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Birth Year:</Text>
          <Text style={styles.infoValue}>{user.birthYear}</Text>
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>{user.gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
