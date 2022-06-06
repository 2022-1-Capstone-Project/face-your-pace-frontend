// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
import { useNavigation } from '@react-navigation/native';

import Loader from '../Components/Loader';


function checkPersonalInfo(userAge,userHeight,userWeight){

  if(userAge!=''){
    if(isNaN(userAge))
    {
      alert("나이는 숫자로 입력해주세요!");
      return;
    }
    if(userAge<13||userAge>99)
    {
      alert("나이를 정확하게 입력해주세요!");
      return;
    }
  }
  if(userHeight!=''){
    if(isNaN(userHeight))
    {
      alert("키는 숫자로 입력해주세요!");
      return;
    }
    if(userHeight<60||userHeight>300)
    {
      alert("키는 숫자로 입력해주세요!");
      return;
    }
  }
  if(userWeight!=''){
    if(isNaN(userWeight))
    {
      alert("나이는 숫자로 입력해주세요!");
      return;
    }
    if(userWeight<0||userWeight>200)
    {
      alert("정확한 몸무게를 입력해주세요!");
      return;
    }
  }
  return true;
}


const RegisterScreen_personal_info = (props) => {
  
  const userInfo = props.route.params;
  const [userAge, setUserAge] = useState(18);
  const [userHeight, setUserHeight] = useState(165);
  const [userWeight, setUserWeight] = useState(50);
  const [userGender, setUserGender] = useState('m');

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');


  const ageInputRef = createRef();
  const weightInputRef = createRef();
  const heightInputRef = createRef();
  console.log(userInfo);
  const handleSubmitButton = () => {
    console.log(userInfo);
    
    if(!checkPersonalInfo(userAge,userHeight,userWeight))
    {
      return;
    }
    var age = "userAge";
    userInfo[age] = userAge;

    var height = "userHeight";
    userInfo[height] = userHeight;

    var weight = "userWeight";
    userInfo[weight] = userWeight;

    var pace = "target_pace";
    userInfo[pace] = 0;
    var stride = "stride";
    userInfo[stride] = 0;
    var workout_level = "workout_level";
    userInfo[workout_level] = 1;

    var gender = "gender";
    userInfo[gender] = userGender;


    var formBody = [];
    for (var key in userInfo) {
      var value = userInfo[key];
      formBody.push(key + '=' + value);
    }
    formBody = formBody.join('&');
    setLoading(true);
    axios.post('http://52.41.225.196:8081/auth/signup', formBody)
    //axios.post('http://127.0.0.1:8080/auth/signup', formBody)
    .then(function(response){
      setLoading(false);
      /*if (response.status === 'success') {
       
        console.log(response.data.email);
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext(response.msg);
        console.log('회원가입에 실패하였습니다!');
      }*/
      //회원가입이 이미 되어 있다면?
      console.log(response);
      console.log(userInfo);
      if(!isNaN(response.data)&&response.data!=false){
        alert(userInfo.userName+"님의 회원가입에 성공하였습니다! 로그인 화면으로 이동합니다.");
        //AsyncStorage.setItem('user_email', response.data.email);
        navigation.replace('LoginScreen');
      }
      else{
        alert("회원가입 과정에서 오류가 발생했습니다! 로그인 페이지로 이동합니다..");
        navigation.replace("LoginScreen");
      }

      if(response.status==500)
      {
        alert("이미 가입되어 있는 회원입니다. 로그인 페이지로 이동합니다..");
        navigation.replace("LoginScreen");
      }

    }
      )
    .catch(error => {
        setLoading(false);
        console.log(error);
        alert("회원가입에 실패했습니다. 로그인 페이지로 이동합니다.");
        navigation.replace("LoginScreen");
    });


    setErrortext('');
    //Show Loader

  };
  



  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          flex:1,
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
        </View>   
        <KeyboardAvoidingView enabled>

        <Text style={{marginLeft:40, color:'black'}}>나이, 키, 몸무게 입력은 필수입니다.</Text>
        <View style={styles.SectionStyle}>
            <TextInput
              label={
                <Text>
                     나이
                     <Text style={{color: 'red'}}> *</Text>
                </Text>
              }
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              underlineColorAndroid="#f000"
              placeholder="나이를 입력해 주세요."
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                heightInputRef.current &&
                heightInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
                label={
                  <Text>
                       키
                       <Text style={{color: 'red'}}> *</Text>
                  </Text>
                }
              style={styles.inputStyle}
              onChangeText={(UserHeight) =>
                setUserHeight(UserHeight)
              }
              underlineColorAndroid="#f000"
              placeholder="gracias키를 입력해 주세요. 단위(cm)"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={heightInputRef}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={  weightInputRef.current &&
                weightInputRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
                label={
                  <Text>
                       몸무게
                       <Text style={{color: 'red'}}> *</Text>
                  </Text>
                }
              style={styles.inputStyle}
              onChangeText={(UserWeight) =>
                setUserWeight(UserWeight)
              }
              underlineColorAndroid="#f000"
              placeholder="몸무게를 입력해 주세요. 단위(kg)"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              keyboardType="numeric"
              ref={weightInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
                label={
                  <Text>
                       성별
                       <Text style={{color: 'red'}}> *</Text>
                  </Text>
                }
              style={styles.inputStyle}
              onChangeText={(gender) =>
                setUserGender(gender)
              }
              underlineColorAndroid="#f000"
              placeholder="성별을 입력해 주세요."
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>회원가입</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen_personal_info;

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