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
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const HomeScreen = () => {


  const handleSubmit=()=>{
    navigation.navigate(
      'MusicAddScreen',{params:{user_id:value}}
    )
    
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16,backgroundColor:'white'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <Text style={styles.textStyle1}>
                  이런 저장된 음악이 없으시군요...
          </Text>
          <TouchableOpacity  activeOpacity={0.5}
                     onPress={handleSubmit}
                    >
                      <Image
                            source={require('../../Image/playlist/add.png')}
                            style={styles.imgStyle}
                      />
                      <Text style={styles.addTextStyle}>
                            음악 추가하기
                      </Text>
                  </TouchableOpacity>
        </View>
       
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
imgStyle:{

  flex: 1,
  width: 100,
  height: 100,
  resizeMode: 'contain',

},

addTextStyle:{
  width: '60%',
  height: 100,
  position:'absolute',
  top:360,
  fontSize:20,
  left:-10
},
textStyle1:{
  width: '100%',
  height: 100,
  position:'absolute',
  fontSize:20,
  left:50,
  top:180
},
});
export default HomeScreen;