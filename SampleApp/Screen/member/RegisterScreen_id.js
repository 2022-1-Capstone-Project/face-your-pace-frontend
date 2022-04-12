// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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


import Loader from '../Components/Loader';

const  isId= (asValue)=> {
	var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
 
	return regExp.test(asValue);
};

const RegisterScreen_id = (props) => {
  const [userId, setUserId] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const navigation = useNavigation();


  const IdInputRef = createRef();


  const handleNextButton = () => {
    var finish = false;
    setErrortext('');
    const userInfo = 
    {
      Id:userId
    }
    if(!userId){
      alert('아이디를 입력해주세요.');
      return;
    }
    else if(!isId(userId)){
      alert('아이디를 정확히 입력해주세요!');
      return;
    }
    navigation.navigate("RegisterScreen_email",userInfo);

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
        <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              label={
                <Text>
                     ID
                     <Text style={{color: 'red'}}> *</Text>
                </Text>
              }
              onChangeText={(UserId) => setUserId(UserId)}
              underlineColorAndroid="#f000"
              placeholder="ID를 입력해 주세요."
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              maxLength={20}
              onSubmitEditing={() =>
                nameInputRef.current &&
                nameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          
        </View>
         
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleNextButton}>
            <Text style={styles.buttonTextStyle}>다음</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen_id;

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