import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    fontFamily: 'Sora',
    paddingBottom: 10,
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: wp('5.5%'),
  },
  favoritesList: {
    marginTop: 20,
    paddingBottom: 80,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#C67C4E',
    marginBottom: 15,
    marginTop: 10,
    padding: 15,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  businessImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  businessInfo: {
    flex: 1,
    marginLeft: 15,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C67C4E',
  },
  businessAddress: {
    fontSize: 14,
    color: '#7D7D7D',
    marginVertical: 5,
  },
  starRatings: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    color: '#FFA726',
    fontSize: 16,
  },
  starInactive: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  starRatingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  averageRatingText: {
    fontSize: 14,
    color: '#313131',
    marginLeft: 8,
    paddingTop: 8,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 24,
    height: 24,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: -15,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
});

export default styles;