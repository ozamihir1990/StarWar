import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1F1F1F', // Dark background color
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
