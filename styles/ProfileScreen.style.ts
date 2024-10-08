export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c', // Dark background
    padding: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#282828', // Slightly lighter background for the profile section
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000', // Add shadow for better visual separation
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow support
  },
  title: {
    fontSize: 24,
    color: '#FFD700', // Gold color for title
    textAlign: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular photo
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2, // Add a border to the photo
    borderColor: '#FFD700', // Gold border
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 18,
    color: '#FFF', // White text for labels
  },
  infoValue: {
    fontSize: 18,
    color: '#FFD700', // Gold text for values
  },
};
