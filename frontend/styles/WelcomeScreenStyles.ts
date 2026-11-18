import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  topSection: {
    flex: 1, // Occupy half the screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1, // Occupy the other half of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',        // Full width of the screen
    height: '100%',       // Full height of the top section
    resizeMode: 'cover',  // Ensure the image fills the area
    borderBottomLeftRadius: 25, // Keep bottom corners straight
    borderBottomRightRadius: 25, // Keep bottom corners straight
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
    marginTop:10,
  },
  highlight: {
    color: '#FF8C00',
  },
  subtitle: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 50,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});