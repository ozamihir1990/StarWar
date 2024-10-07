import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F', // Dark background color
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 20, // Space the logo from the top of the screen
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Center the form
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // White input background
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFD700', // Gold button color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F', // Dark text color
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  link: {
    color: '#FFD700', // Gold color for the link
    marginTop: 10,
  },
  placeholderTextColor: {
    color: '#888888', // Gray color for placeholder text
  },
});
