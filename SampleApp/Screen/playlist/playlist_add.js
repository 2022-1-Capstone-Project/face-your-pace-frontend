// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';


import { Searchbar,Text,TextInput } from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';


const PlayListAddScreen = ({navigation}) => {
  //fetchPlayListData();
  //State for ActivityIndicator animation


  const [animating, setAnimating] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userNumber, setUserNumber] = useState('');

  AsyncStorage.getItem('user_id').then((val) =>
  setUserId(val));

  AsyncStorage.getItem('user_number').then((val) =>
  setUserNumber(val));

  const handleSubmit=()=>{
    if (!name) {
      alert('플레이리스트 이름을 입력해주시기 바랍니다.');
      return;
    }
    //alert(formBody);
    //현재는 3000 포트 번호로 되어 있는데 로컬에서 구동하는 백엔드 서버의 포트 번호에 따라 3000값을 바꾸시면 됩니다.
   
    let dataToSend = {name: name,userId:userId};
    console.log(name);
    console.log(userId);
    var formBody = [];
    for (var key in dataToSend) {
      var value = dataToSend[key];
      formBody.push(key + '=' + value);
    }
    formBody = formBody.join('&');
    alert(formBody);
    axios({
      method:"POST",
      url: 'http://52.41.225.196:8081/api/music/playlist/add',
      data:formBody,
  }).then((res)=>{
    if (res.data==true) {
      alert("플레이리스트 추가에 성공하였습니다.");
      navigation.replace('PlayListScreen',{params:{user_id:userId,user_number:userNumber}});
    }
    else{
      alert('플레이리스트 추가에 실패했습니다.');
    }
  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });
  
  }


  




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
      <Text style={{fontSize:20}}>플레이리스트 이름을 입력하세요. </Text>
      </View>
      <KeyboardAvoidingView enabled>
      <View style={styles.SectionStyle}>
          <TextInput color='black'
            style={styles.inputStyle}
            label={
              <Text>
                   playlist_name
                   <Text style={{color: 'red'}}> *</Text>
              </Text>
            }
            onChangeText={(name) => setName(name)}
            underlineColorAndroid="#f000"
            placeholder="플레이리스트 이름을 입력해 주세요."
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
          onPress={handleSubmit}
          >
          <Text style={styles.buttonTextStyle}>저장</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  </View>
  );
};

export default PlayListAddScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'column',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  textStyle:{

    marginBottom:20,
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