import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    fontFamily: 'Sora',
    paddingBottom: 10,
  },
  notificationButton: {
    padding: 10,
  },
  notificationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,

  },
  icon: {
    width: 100,
    height: 100,
    tintColor: '#C67C4E', // Optional: Tint color for placeholder icon
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7D7D7D',
  },
  photoButton: {
    padding: 10,
    backgroundColor: '#C67C4E',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  photoButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldTitle: {
    fontSize: 14,
    color: '#C67C4E',
    marginBottom: 2,
  },
  underlineInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7CD',
    fontSize: 14,
    color: '#313131',
  },
  textArea: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#C7C7CD',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
  inputBox: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#C7C7CD',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  labelWithLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
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
  policyLink: {
    color: '#C67C4E',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginBottom: 15,
    marginTop: 0,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 100,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView expands to fit its content
    paddingBottom: 20, // Adds some padding at the bottom
  },
  tapToChangeText: {
    fontSize: 14,
    color: '#C7C7CD', // Lighter color to indicate placeholder text
    textDecorationLine: 'underline', // To make it obvious it's tappable
    paddingVertical: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30', // Red color for delete
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
