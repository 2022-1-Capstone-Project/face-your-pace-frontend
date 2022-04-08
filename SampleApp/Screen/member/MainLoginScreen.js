// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component


//이 파일은 사용하지 않습니다.
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";

import AsyncStorage from '@react-native-community/async-storage';

import Loader from '../Components/Loader';


const iosKeys = {
  kConsumerKey: "naver client id",
  kConsumerSecret: "naver secret id",
  kServiceAppName: "테스트앱(iOS)",
  kServiceAppUrlScheme: "testapp" // only for iOS
};
const androidKeys = {
  kConsumerKey: "naver client id",
  kConsumerSecret: "naver secret id",
  kServiceAppName: "FaceYourPace"
};
const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const MainLoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [naverToken, setNaverToken] = useState(null);

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../Image/common/logo.png')}
                style={{
                  width: '70%',
                  height: 200,
                  resizeMode: 'contain',
                  top:-50
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle1}
              activeOpacity={0.5}
              onPress={()=>naverLogin(initials)}
              >
              <Image source={require('../../Image/login/btnG_login.png')} resizeMode='contain' style={{flex:1}}/>
              
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.buttonStyle2}
              activeOpacity={0.5}
              >
              <Text style={styles.buttonTextStyle}>이메일로 로그인</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              >
              처음이신가요? 
            </Text>
            <Text
              style={styles.registerTextStyle2}
              onPress={() => navigation.navigate('RegisterScreen')}>
              회원가입하기
            </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default MainLoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle1: {
    borderWidth: 0,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyle2: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  registerTextStyle2:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});