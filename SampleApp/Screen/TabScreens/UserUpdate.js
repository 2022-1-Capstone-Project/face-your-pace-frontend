// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';
import axios from 'axios';

const UserUpdateScreen = ({props}) => {

  const [user,setUser] = useState('');
  
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');

  const [userPassword, setUserPassword] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [errortext, setErrortext] = useState('');

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);


  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const weightInputRef = createRef();
  const heightInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  var value = "";

  useEffect(() => {

    AsyncStorage.getItem('user_id').then((val) =>
    setUserId(val));


    async function fetchUser() {
      const response = await axios({
        method:"GET",
        url: 'http://127.0.0.1:8080/api/mypage/members/'+userId
      });
      console.log(response.data);
      setUser('');
      setUser(response.data);
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      setUserEmail(response.data.userEmail);
      setUserPassword(response.data.userPw);
      setUserAge(response.data.userAge);
      setUserHeight(response.data.userHeight);
      setUserWeight(response.data.userWeight);
      setLoading(false);
    }
    fetchUser();
  }, []);

 

  const renderUser=(user)=> {
    console.log(user);
    return user.map((item)=>{
      return (
      <KeyboardAvoidingView key={item.id}enabled>
      <View style={styles.SectionStyle}>
          <Text style={{fontSize:20}}> 아이디 : {item.userId}</Text>

        </View>
        <View style={styles.SectionStyle}>
        <Text style={{fontSize:20}}> 별명 : {item.userName}</Text>
          
        </View>
        <View style={styles.SectionStyle}>
        <Text style={{fontSize:20}}> 이메일 : {item.userEmail}</Text>
        </View>
       
        <View style={styles.SectionStyle}>
        <Text style={{fontSize:20}}> 나이 : {item.userAge}</Text>
          
        </View>
        <View style={styles.SectionStyle}>
        <Text style={{fontSize:20}}> 키 : {item.userHeight}</Text>

        </View>
        <View style={styles.SectionStyle}>
        <Text style={{fontSize:20}}> 몸무게 : {item.userWeight}</Text>
          
        </View>
      </KeyboardAvoidingView>

    );
      });
   }


  if (loading) {
    return (
      <View>
        <Loader loading={loading} />
      </View>
      );
  }
  else{
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Image/common/logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />

          <Text style={{fontSize:20,marginBottom:10,color:'black'}}>

            사용자 정보 조회하기
          </Text>


        </View>
       {
         renderUser(user)
       }
      </ScrollView>
    </View>
  );
      }
};
export default UserUpdateScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    //textAlign:'center',
   // margin: 0,
   height:50,
   width:50,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});