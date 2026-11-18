import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginTop: 30,
  },
  label: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'left',
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginBottom: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FF8C00',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  privacyText: {
    color: '#7D7D7D',
    fontSize: 12,
    marginTop: 50,
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
