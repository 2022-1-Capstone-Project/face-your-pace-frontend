// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert
} from 'react-native';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import AsyncStorage from '@react-native-community/async-storage';

import Loader from '../Components/Loader';
import useDidMountEffect from '../../components/useDIdMountEffect';


function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}


const iosKeys = {
  kConsumerKey: "kwchany",
  kConsumerSecret: "kwchany1",
  kServiceAppName: "테스트앱(iOS)",
  kServiceAppUrlScheme: "testapp" // only for iOS
};
const androidKeys = {
  kConsumerKey: "f2H9yNRsK3exdKOl2EHO",
  kConsumerSecret: "h1Ql8ulzIM",
  kServiceAppName: "FaceYourPace"
};


const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const LoginScreen = ({navigation}) => {

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();
  var profileResult;

  const [naverToken, setNaverToken] = useState(null);

  useDidMountEffect(() => {
    getUserProfile();
  }, [naverToken]); // <- add the count variable here

  //console.log(naverToken);
  const naverLogout = () => {
    NaverLogin.logout();
    Alert.alert(
      "로그아웃",
      "로그아웃이 완료되었습니다."
    );
    setNaverToken("");
  };

  const  isId= (asValue)=> {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
   
    return regExp.test(asValue);
  };
  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log("hello");
        setNaverToken(token);
        if (err) {
          reject(err.message);
          return;
        }
        resolve(token);
       
       //getUserProfile(); // <---- 요기 추가
      });
    });
  };


  /*{errortext != '' ? (
    <Text style={styles.errorTextStyle}>
      {errortext}
    </Text>
  ) : null}*/
  const getUserProfile = async () => {
    profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    }

    const email = profileResult.reponse.email;
    console.log("AAAAAA");
    console.log(reponse.data.email);
    navigation.replace(
        'TabNavigationRoutes',{params:{user_id:email}}
        );
      AsyncStorage.setItem('user_id', profileResult.response.email);
  };
  

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userId) {
      alert('아이디를 입력해주시기 바랍니다.');
      return;
    }
    if(!isId(userId)){
      alert('이메일 형식이 잘못 입력되었습니다. 다시 입력해주시기 바랍니다.');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주시기 바랍니다!');
      return;
    }
    setLoading(true);
    let dataToSend = {userId: userId, userPw: userPassword};
    var formBody = [];
    for (var key in dataToSend) {
      var value = dataToSend[key];
      formBody.push(key + '=' + value);
    }
    formBody = formBody.join('&');

    //현재는 3000 포트 번호로 되어 있는데 로컬에서 구동하는 백엔드 서버의 포트 번호에 따라 3000값을 바꾸시면 됩니다.
   
    axios.post('http://52.41.225.196:8081/auth/login', formBody)
    .then( function(response){
      setLoading(false);
      if (response.data!=false) {
        console.log("asdfasdfsaf");
        console.log(response.data);
        AsyncStorage.setItem('user_id', userId);
        AsyncStorage.setItem('user_number',response.data);
        console.log("asdfasdf");
        alert("로그인에 성공하였습니다.");
       
        navigation.replace('TabNavigationRoutes',{params:{user_id:userId,user_number:response.data}});
      }
      else{
        alert('아이디와 비밀번호를 확인해주시기 바랍니다!');
      }
    }
      )
    .catch(error => {
        //setErrortext('Error:'+ error.message);
        setLoading(false);
        NaverLogin.logout();
        setNaverToken("");
    });
   
   
   
    /*fetch('http://127.0.0.1:8080/auth/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('이메일 ID와 비밀번호를 확인해주시기 바랍니다!');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });*/
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
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../Image/common/logo.png')}
                style={{
                  width: '60%',
                  height: 200,
                  resizeMode: 'contain',
            
                }}
              />
            </View>

            
            {!naverToken && <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserId) =>
                  setUserId(UserId)
                }
                placeholder="아이디를 입력하세요." 
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>}
            {!naverToken && 
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  placeholder="비밀번호를 입력하세요." 
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
            }

            {!naverToken && <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>로그인</Text>
            </TouchableOpacity>
            }
    
          

    
            {!naverToken &&
            <View style = {styles.registerTextStyle}>
              <Text >
                <Text
                  style={styles.registerTextStyle1}
                  >
                  처음이신가요?  {" "}{" "}     
                </Text>
                <Text
                  style={styles.registerTextStyle2}
                  onPress={() => navigation.navigate('Register')}>
                  회원가입하기
                </Text>
              </Text>
            </View>
            } 


          {errortext != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errortext}
                      </Text>
                    ) : null}
            {!!naverToken &&
               <Text
               style={styles.registerTextStyle2}
               >
               {profileResult}
             </Text>
            }
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};


export default LoginScreen;

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


  buttonStyle: {
    backgroundColor: '#fffff',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#dadae8',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop:20,
    marginBottom: 25,
    borderWidth: 1,
  },
  buttonStyle2: {
    backgroundColor: '#03C75A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#dadae8',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    //textAlign:'center',
   // margin: 0,
   height:60,
    flex: 1,
    color: 'black',
   // paddingLeft: 15,
   //paddingRight: 15,
   // borderWidth: 1,
    activeUnderlineColor: 'purple',
    activeOutlineColor: 'purple',
    //borderRadius: 30,
   // borderColor: '#dadae8',
  },

  registerTextStyle: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  registerTextStyle1: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 30,
  },
  registerTextStyle2:{
    color: '#1AE162',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 30,

  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  registrationStyle: {
    justifyContent:'center'
  }
});