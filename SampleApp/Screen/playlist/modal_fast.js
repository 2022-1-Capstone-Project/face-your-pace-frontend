// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect,createRef} from 'react';

import axios from 'axios';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Searchbar,Text } from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';


const FastScreen = ({route,navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const {playlist_id,music_title} = route.params;



    const [start_m, setStart_m] = useState('');
    const [start_s, setStart_s] = useState('');
    const [finish_m, setFinish_m] = useState('');
    const [finish_s, setFinish_s] = useState('');
    const [repeat, setRepeat] = useState('');
    const [bpm, setBpm] = useState('');
  
    const start_s_Ref = createRef();
    const finish_m_Ref = createRef();
    const finish_s_Ref = createRef();
    const repeat_Ref = createRef();
  //initialArr = fetchPlayListData();
  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled style={styles.mainBody} >
          <ScrollView style={{ width:'100%',flex:1}}>

          <Image
                source={require('../../Image/common/logo.png')}
                style={{
                  width: '60%',
                  height: 200,
                  resizeMode: 'contain',
            
                }}
          />
          <Text> 현재 체형에 적합한 BPM보다 낮은 BPM을 설정하셨습니다. 추천BPM으로 설정할까요?</Text>
          </ScrollView>


    </KeyboardAvoidingView>
  );
};

export default FastScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header:{
    height: 40,
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal:20,
  },
  headerTextStyle:{

    fontSize:20,
    top:20,
    left:45
  },
  bodyText1:{

    fontSize:30,
    left:20,
    marginBottom:30
  },
  SectionStyle: {
    flex:1,
    flexdirection: 'row',
    justifyContent:'space-between',
    marginLeft: 35,
    marginRight: 35,
    height: 100,
  },

  body:{
    flexDirection: 'column',
    flex:1,
    justifyContent: 'center', alignItems: 'center'
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
    height:40,
    color: 'black',
    width:50,
    left:120,
    top:-35,
    borderWidth: 1,
    borderRadius: 15,
    fontSize:15,
    textAlign:'center',
    borderColor: '#dadae8',
  },

  inputStyle2: {
    height:40,
    color: 'black',
    width:50,
    left:220,
    top:-100  ,
    borderWidth: 1,
    borderRadius: 15,
    fontSize:15,
    textAlign:'center',
    borderColor: '#dadae8',
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


 imgStyle:{

      width: '30%',
      height: 100,
      borderWidth: 5,
      resizeMode: 'contain',
      borderColor: '#dadae8',
      position: 'absolute',
      left:0
 },

 playlistTextStyle:{
    width: '50%',
    height: 100,
    position:'absolute',
    top:50,
    right:0
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