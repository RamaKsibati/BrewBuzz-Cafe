import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingTop: -100,
    paddingBottom:-30,
    width: '100%', // Full width
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -40, // Move the title further down
    position: 'relative',
  },
  backArrow: {
    position: 'absolute',
    left: 0, // Align the back arrow to the left
    right:40,
    //padding: 0,
    zIndex: 10, 
  },
  backArrowImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  pageTitle: {
    flex: 1, // Center the title between back arrow and notification icon
    textAlign: 'center', // Ensure the text is centered
    fontSize: 25, // Larger font size
    fontWeight: 'bold',
    color: '#C67C4E',
    fontFamily: 'Sora', 
  },
  notificationIcon: {
    position: 'absolute',
    right: 0, 
    padding: 10,
  },
  navIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginBottom: 20,
    borderWidth: 1, // Add border width for the outline
    borderColor: '#C67C4E', // Match the color of the text
    borderRadius: 20, // Optional: add rounded corners
  },
  descriptionText: {
    fontSize: 30, 
    color: '#C67C4E',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Sora', 
  },
  getStartedButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    
  },
  getStartedText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Sora',

  },
});

export default styles;
