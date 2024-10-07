import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/ProfileScreen.style';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}'s Profile</Text>
      <Text style={styles.info}>Height: {user.height}</Text>
      <Text style={styles.info}>Mass: {user.mass}</Text>
      <Text style={styles.info}>Birth Year: {user.birth_year}</Text>
      <Text style={styles.info}>Gender: {user.gender}</Text>
      {/* Add more user details or functionality as needed */}
    </View>
  );
};

export default ProfileScreen;
