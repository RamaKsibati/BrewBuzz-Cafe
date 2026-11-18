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
    backgroundColor: '#313131',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 130,
    paddingHorizontal: 0,
   
  },

  headerTextContainer: {
    flex:1,
    alignItems: 'flex-start',
    paddingLeft: 20,
    marginTop:-55,
   
  },
  welcomeText: {
    fontSize: 16,
    color: '#B7B7B7',
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C67C4E',
    marginTop: 0,
  },
  notificationIcon: {
    padding: 20,
    marginTop:-75,
  },
  averageRatingText: {
    fontSize: 14,
    //fontWeight: 'bold',
    color: '#313131',
    marginLeft: 8, // ✅ Space between stars and number
    paddingTop:8,
  },
  starRatingsContainer: {
    flexDirection: 'row', // ✅ Ensures stars and rating number are in the same row
    alignItems: 'center', // ✅ Align items properly
    marginTop: 5,
  },
  

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: -3,
    height: 45,
    marginVertical: -25,
    marginHorizontal:15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    marginBottom:2,
    
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 0, // Add space between icon and input
    marginLeft:15,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 30,
    color: '#313131',
  },
 
  businessList: {
    //flex: 1,
    marginTop: 5,
    paddingBottom: 80,
    paddingTop:20,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1, // Add or increase the border width
    borderColor:'#C67C4E',
    marginBottom: 15,
    marginTop:10,
    padding: 10, 
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  businessImage: {
    width: 110,
    height: 120,
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
    flexWrap: 'wrap',
    marginRight:10,
    maxWidth: '85%',
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
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width:24,
    height:24,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
    marginTop:1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#313131',
    paddingHorizontal: 15,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  navIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    
  },
  
  suitcaseButton: {
    position: 'absolute',
    bottom: 80, // Adjust as needed
    alignSelf: 'center',
  },
  suitcaseIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default styles;
