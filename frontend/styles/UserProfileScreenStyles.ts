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
    tintColor: '#C67C4E',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#C67C4E',
  },
  emailText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  options: {
    alignItems: 'center',
    marginVertical: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#C67C4E',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
});
