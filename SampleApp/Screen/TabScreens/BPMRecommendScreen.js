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
  TextInput,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Searchbar,Text } from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';






const BPMRecommendScreen = ({route,navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
 // const {playlist_id,music_title} = route.params;

  const [loading, setLoading] = useState(true);
  const [bpm, setBPM] = useState('');
 const userId = route.params.user_id


 useEffect(() => {
  console.log("aaaaa");
  console.log(userId);
  async function fetchMusic() {
    const response = await axios({
      method:"POST",
      url: 'http://52.41.225.196:8081/api/recommand/bpm/'+userId,
      //url: 'http://127.0.0.1:8080//api/music/list/all',
      //data : formBody
    });
    
    console.log(response.data);
    setBPM(response.data);
    setLoading(false);

  }
  fetchMusic().catch(error=>{
    setLoading(false);
    alert("에러가 발생했습니다.");
  });


  
}, []);

const handleSubmitPress = ()=>{

  
}
  //initialArr = fetchPlayListData();
  if (loading) {
    return (
      <View>
        <Loader loading={loading} />
      </View>
      )
  }


  else{

  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled style={styles.mainBody} >

          <View style = {{justifyContent:'center',flex:1}}>
          <Image
                source={require('../../Image/music/running.jpg')}
                style={{
                  width: '100%',
                  height: 300,
                  left:0,
                  resizeMode: 'contain',
            
                }}
          />
          <Text
            style={{
              width:'80%',  
              fontSize:20,
              top:20,
              left:60,
            }}>{userId}님에게 가장 적합한 BPM은 {bpm.substring(0,bpm.length-1)}입니다! </Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
           
            </View>
          </View>

          <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                Alert.alert(
                  '로그아웃',
                  '정말 로그아웃하시겠습니까?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: 'Confirm',
                      onPress: () => {
                        //NaverLogin.logout();
                        
                        axios.post('http://127.0.0.1:8080/auth/logout',[])
                        .then( function(response){
                          AsyncStorage.clear();
                          props.navigation.replace('Auth');
                        }
                          )
                        .catch(error => {
                            navigation.replace('Auth');
                            //setErrortext('Error:'+ error.message);
                            setNaverToken("");
                            AsyncStorage.clear();
                         
                        });
        
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Text style={styles.buttonTextStyle}>로그아웃</Text>
            </TouchableOpacity>



    </KeyboardAvoidingView>
  );

          }
};

export default BPMRecommendScreen;

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
  buttonStyle1: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    width:'40%',
    marginTop:50,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,

  },
  buttonStyle2: {
    backgroundColor: '#ff0000',
    borderWidth: 0,
    color: '#FFFFFF',
    width:'40%',
    marginTop:50,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,

  },

  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
    left:175,
    alignContent:'center'
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