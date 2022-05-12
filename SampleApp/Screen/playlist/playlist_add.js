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

  const handleSubmit=()=>{
  
    
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
            onPress={handleSubmit}
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