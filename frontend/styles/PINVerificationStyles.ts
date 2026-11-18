import {StyleSheet} from 'react-native';


const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8EE',
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
      },
      logo: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginTop: 30,
      },
      logoSubtitle: {
        fontSize: 20,
        color: '#C67C4E',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        //alignSelf: 'flex-start',
        textAlign:'center',
        
      },
      
      pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
      },
      pinInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#FFFFFF',
      },
      resendContainer: {
        flexDirection: 'row',
        marginBottom: 5,
      },
      resendText: {
        color: '#333',
        marginRight: 5,
      },
      resendLink: {
        color: '#2B76E5',
        fontWeight: '500',
      },
      signinLink: {
        color: '#2B76E5',
        fontWeight: '500',
      },
      orContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
      },
      orText: {
        fontSize: 16,
        color: '#666',
      },
      signUpButton: {
        backgroundColor: '#000000',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginTop: 10,
        alignItems: 'center',
      },
      signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      privacyContainer: {
        position: 'absolute',
        bottom: 20,
      },
      privacyText: {
        color: '#FF8C00',
        fontSize: 12,
        textDecorationLine: 'underline',
      },
      // New Password Screen Styles
      passwordContainer: {
        width: '100%',
        marginBottom: 20,
      },
      passwordLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
      },
      passwordInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
      },
      doneButton: {
        backgroundColor: '#C67C4E',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 80,
        marginTop: 20,
        alignItems: 'center',
      },
      doneButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      mainContent: {
        flex: 1,
        justifyContent: 'center',
        marginTop:-200,
        gap:20
      
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
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 70,
        borderRadius: 50,
        marginBottom: 15,
        marginTop: 10,
      },
     
    // container: {
    //     flex: 1,
    //     backgroundColor: '#FFF8F5',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 30,
    //   },
    //   logo: {
    //     width: 250,
    //     height: 200,
    //     resizeMode: 'contain',
    //     marginTop: 30,
    //   },
    //   label: {
    //     width: '100%',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     color: '#333',
    //     marginBottom: 5,
    //     textAlign: 'left',
    //     marginLeft: 10,
    //   },
    //   input: {
    //     width: '100%',
    //     height: 50,
    //     borderWidth: 1,
    //     borderColor: '#E0E0E0',
    //     borderRadius: 8,
    //     paddingHorizontal: 15,
    //     backgroundColor: '#FFF',
    //     marginBottom: 15,
    //   },
    //   button: {
    //     backgroundColor: '#000',
    //     paddingVertical: 12,
    //     paddingHorizontal: 70,
    //     borderRadius: 50,
    //     marginBottom: 15,
    //     marginTop: 10,
    //   },
    //   buttonText: {
    //     color: '#FFF',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //   },
    //   linkText: {
    //     color: '#FF8C00',
    //     fontSize: 12,
    //     textDecorationLine: 'underline',
    //     marginTop: 10,
    //   },
    //   privacyText: {
    //     color: '#7D7D7D',
    //     fontSize: 12,
    //     marginTop: 50,
    //   },
    
    //   passwordContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: '#E0E0E0',
    //     borderRadius: 8,
    //     paddingHorizontal: 15,
    //     backgroundColor: '#FFF',
    //     marginBottom: 15,
    //   },
    //   passwordInput: {
    //     flex: 1,
    //     height: 40,
    //   },
    //   eyeIcon: {
    //     fontSize: 14,
    //     marginLeft: 10,
    //   }
});
export default styles;