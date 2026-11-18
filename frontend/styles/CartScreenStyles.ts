import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingTop: -100,  
    paddingBottom: -30, 
    width: '100%',
  },
  

  // Empty Cart State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  emptyText: {
    textAlign: 'center',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#C67C4E',
    fontFamily: 'Sora',
  },

  // Business Group Container
  businessGroup: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp('4%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    borderRadius: wp('3%'),
    padding: wp('4%'),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // Shadow:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  shopInfo: {
    marginBottom: hp('1%'),
  },
  shopName: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#C67C4E',
    fontFamily: 'Sora',
  },
  shopAddress: {
    fontSize: wp('4%'),
    color: '#7D7D7D',
    fontFamily: 'Sora',
  },

  // Cart Items
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginVertical: wp('1.5%'),
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  itemInfo: {},
  itemName: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#2D2D2D',
    fontFamily: 'Sora',
  },
  itemPrice: {
    fontSize: wp('4%'),
    color: '#C67C4E',
    marginTop: hp('0.5%'),
    fontFamily: 'Sora',
  },

  // Quantity & Remove Buttons
  quantityAndRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#EAEAEA',
    padding: wp('2.5%'),
    borderRadius: wp('2%'),
  },
  quantityText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Sora',
  },
  quantityNumber: {
    marginHorizontal: wp('3%'),
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#2D2D2D',
    fontFamily: 'Sora',
  },
  removeTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: wp('3.5%'),
    color: '#FF5C5C',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: 'Sora',
  },

  // Order Summary Section
  businessGroupFooter: {
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Sora',
  },
  orderButton: {
    backgroundColor: '#3E8221',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Clear Cart Button
  clearButtonContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('4%'),
  },
  clearButton: {
    backgroundColor: '#C67C4E',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('6%'),
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '700',
    fontFamily: 'Sora',
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default styles;