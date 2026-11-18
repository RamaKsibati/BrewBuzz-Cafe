import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background for a clean look
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for the footer
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // White header background
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Light gray border
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#333', // Darker icon color
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C67C4E', // Use the button color for the header title
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#C67C4E', // Use the button color for the item name
    backgroundColor: '#fff', // White background for the item name
    marginBottom: 8, // Add some spacing
  },
  modifierGroup: {
    marginBottom: 16,
    backgroundColor: '#fff', // White background for each group
    borderRadius: 8, // Rounded corners
    padding: 16, // Inner padding
    shadowColor: '#000', // Shadow for a card-like effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#C67C4E', // Use the button color for group names
  },
  modifierOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
    borderRadius: 8, // Rounded corners
    marginBottom: 8,
    backgroundColor: '#fff', // White background for options
  },
  selectedModifierOption: {
    borderColor: '#C67C4E', // Orange border for selected options
    backgroundColor: '#FFF3E0', // Light orange background for selected options
  },
  optionName: {
    fontSize: 16,
    color: '#333', // Darker text for better contrast
  },
  optionPrice: {
    fontSize: 16,
    color: '#C67C4E', // Use the button color for prices
  },
  additionalRequestsContainer: {
    marginBottom: 16,
    backgroundColor: '#fff', // White background
    borderRadius: 8, // Rounded corners
    padding: 16, // Inner padding
    shadowColor: '#000', // Shadow for a card-like effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  additionalRequestsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#C67C4E', // Use the button color for the label
  },
  additionalRequestsInput: {
    fontSize: 14,
    color: '#333', // Darker text for better contrast
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
    borderRadius: 8, // Rounded corners
    padding: 12, // Inner padding
    textAlignVertical: 'top', // Align text to the top for multiline input
    minHeight: 100, // Minimum height for the input box
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // White background for footer
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Light gray border
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C67C4E', // Use the button color for the total price
  },
  addToCartButton: {
    backgroundColor: '#C67C4E', // Orange button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // More rounded corners for the button
  },
  addToCartButtonText: {
    color: '#fff', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

