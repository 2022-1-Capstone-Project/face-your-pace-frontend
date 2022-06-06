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


const MusicAddScreen = ({route,navigation}) => {
  //fetchPlayListData();
  //State for ActivityIndicator animation


  const [animating, setAnimating] = useState(true);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = route.params.user_id;


  useEffect(() => {
    console.log("aaaaa");
    console.log(userId);
    async function fetchMusic() {
      const response = await axios({
        method:"GET",
        url: 'http://52.41.225.196:8081/api/music/list/'+userId,
        //url: 'http://127.0.0.1:8080//api/music/list/all',
        //data : formBody
      });
      
      console.log(response.data);
      setMusic(response.data);
      setLoading(false);
  
    }
    fetchMusic().catch(error=>{
      setLoading(false);
      alert("에러가 발생했습니다.");
    });


    
  }, []);


  const renderPlaylists=(initialArr)=> {
    
    const imgUrl= require('../../Image/playlist/music2.png')
    if(music!=[]||music!=null){
      return initialArr.map((item) => {
          return (
            <TouchableOpacity>
           
              <View  style={styles.SectionStyle}>
                <View>
                  <Image
                        source={imgUrl}
                        style={styles.imgStyle}
                  />
                  <Text style={styles.playlistTextStyle}>
                        {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
      });
  }
  };

  
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

      <ScrollView style={{ width:'100%',flex:1}}>
      
            {

                  renderPlaylists(music)
            }
            
          </ScrollView>
      


    </KeyboardAvoidingView>
    );
          }
};

export default MusicAddScreen;

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