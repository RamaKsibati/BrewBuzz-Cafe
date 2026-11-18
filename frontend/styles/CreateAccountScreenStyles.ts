import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');


export default StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerBackground: {
    backgroundColor: '#FFF8F5',
  },
  businessBackground: {
    backgroundColor: '#EDD6C8',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
 
  
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 40,
    marginTop: -50,
    width: '90%',
    position: 'relative', // Add this for zIndex to work
  },
  toggleText: {
    fontSize: 10,
    color: '#C67C4E',
  },
  activeText: {
    color: '#FFF',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
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
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center', // Ensure vertical alignment of both fields
    marginBottom: 15, // Consistent spacing for the row
  },
  wideInput: {
    width: '48%',
  },
  halfInput: {
    width: '48%',
    marginBottom: 0, // Remove unnecessary extra spacing
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#FF8C00',
    fontSize: 14,
  },
  policyText: {
    fontSize: 12,
    color: '#7D7D7D',
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
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7D7D7D',
  },
  signInText: {
    color: '#FF8C00',
    textDecorationLine: 'underline',
  },
  privacyText: {
    textAlign: 'center',
    color: '#7D7D7D',
    fontSize: 11,
    marginTop: 10,
  },
  fakeTextField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 0, // Align with Zipcode
  },
  selectedStateText: {
    fontSize: 14,
    color: '#C7C7CD',
  },
  stateList: {
    maxHeight: 200, // Limit dropdown list height
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  stateItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  stateText: {
    fontSize: 14,
  },
  
  toggleButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: -10, // Negative margin for overlap
    zIndex: 1, // Default zIndex
    elevation: 1, // For Android
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeButton: {
    backgroundColor: '#C67C4E',
    zIndex: 2, // Bring active button to front
    elevation: 2, // For Android
    borderColor: '#C67C4E',
  },
});
