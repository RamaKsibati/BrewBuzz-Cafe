import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20, // Align the back arrow to the left
    right:40,
    zIndex: 10, 
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#C67C4E',
  },
  shopName: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#C67C4E',
  },
  ratingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  ratingFill: {
    height: 6,
    backgroundColor: '#C67C4E', // Brownish-orange color
    borderRadius: 3,
  },
  starButton: {
    padding: 10,
  },
  modalStar: {
    fontSize: 30,
    color: '#C67C4E',
    marginHorizontal: 5,
  },
  averageRating: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#C67C4E', // Brown color
    textAlign: "center",
    marginBottom: 5,
  },
  stars: {
    flexDirection: "row",
  },
  starIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },

  // ⭐ Rating Breakdown Section
  ratingBreakdown: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom:20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,

  },
  ratingText: {
    fontSize: wp("4%"),
    marginRight: 5,
  },
  ratingBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#DDD",
    borderRadius: 3,
  },

  // 📜 Review List
  reviewList: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  reviewCard: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  reviewStars: {
    flexDirection: "row",
    marginLeft: 5,
  },
  starSmall: {
    width: 14,
    height: 14,
    marginHorizontal: 1,
  },
  reviewTime: {
    fontSize: wp("3.5%"),
    color: "#777",
    marginLeft: 5,
  },
  reviewText: {
    fontSize: wp("4%"),
    color: "#444",
    marginTop: 5,
  },

  // ✏️ Leave a Review Button
  leaveReviewButton: {
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingBottom:20,
  },
  leaveReviewText: {
    fontSize: wp("4%"),
    color: "#8A4F2F",
    fontWeight: "bold",
  },

  // 📝 Modal for Posting Review
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: 10,
  },
  starSelection: {
    flexDirection: "row",
    marginBottom: 15,
   marginLeft:10,
   marginRight:10,
    
  },
  input: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    fontSize: wp("4%"),
  },
 
 
  deleteText: {
    marginTop: 10,
    fontSize: wp("4%"),
    color: "#8A4F2F",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 5,
    alignSelf: "center",
  },
  
  
  noReviewsText: {
    fontSize: wp("4%"),
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  starText: {
    fontSize: 14,
    color: '#C67C4E',
    letterSpacing: 3,
    marginHorizontal: 3,
  },
  selectedStar: {
    fontSize: 14,
    color: '#C67C4E',
  },
  backText: {
    fontSize: 22,
    color: "#8A4F2F",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#C67C4E',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    marginTop:8,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // Ensure the text is visible
    textAlign: "center",
  },
  
  cancelButton: {
    borderWidth: 1,
    borderColor: '#C67C4E',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginTop:8,
  },
  cancelText: {
    color: '#C67C4E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
});

export default styles;
