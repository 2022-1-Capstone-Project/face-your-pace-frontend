// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16,backgroundColor:'white'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image 
                    source={require('../../Image/common/running-1.jpg')}
                    style={styles.imgStyle}
          />
            <Image 
                    source={require('../../Image/common/running-2.webp')}
                    style={styles.imgStyle}
          />
        </View>
       
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
imgStyle:{

  flex: 1,
  width: 300,
  height: 300,
  resizeMode: 'contain',

},

});
export default HomeScreen;