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
    paddingBottom: 40,
  },
  backArrow: {
    left: 10,
    right: 40,
    zIndex: 10,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  pageTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#C67C4E',
    paddingBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 20, // Increased margin for spacing
  },
  button: {
    backgroundColor: '#313131', // Use header color
    alignSelf: 'center',
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 80, // Increased padding
    borderRadius: 50,
    marginTop: 20, // Increased margin
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18, // Increased font size
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    marginTop:-200,
    gap:20
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeIcon: {
    fontSize: 14,
    marginLeft: 10,
  }
});

export default styles;