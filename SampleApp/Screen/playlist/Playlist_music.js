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

import { useNavigation } from '@react-navigation/native';
import { Searchbar,Text,TextInput } from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';





const PlayListMusicScreen = ({route,navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const playlist_title = route.params.playlist_title;
  const userId = route.params.user_id;
  const [music,setMusic] = useState('');
  const [loading,setLoading] = useState(true);
  //initialArr = fetchPlayListData();

  console.log(playlist_title);


  useEffect(() => {

    async function fetchMusic() {
      const response = await axios({
        method:"GET",
        url: 'http://52.41.225.196:8081/api/music/list/'+userId+'/'+playlist_title,
        //url: 'http://127.0.0.1:8080//api/music/list/all',
        //data : formBody
      });
      console.log("asdfasdfsa");
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

    if(music!=[]||music!=null){
      return initialArr.map((item) => {
          return (
            <View key = {item.id} style={styles.SectionStyle}>
              <View>
                <Image
                      source={require('../../Image/playlist/music2.png')}
                      style={styles.imgStyle}
                />
                <Text style={styles.playlistTextStyle}>
                      {item.title}
                </Text>
    
                <TouchableOpacity
                onPress={()=>navigation.navigate("Config_screen1",{
                  music_id: item.id,
                  music_title:item.title
                })}>
    
                  <Image
                        source={item.configUrl}
                        style={styles.imgStyle2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
      });
  }
  };
  

  const handleSubmit=()=>{
    AsyncStorage.getItem('user_id').then((value) =>
        navigation.navigate(
          'MusicAddScreen',{params:{user_id:value}}
        ),
      );
    
  }
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);




      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen

      /*fetch('http://127.0.0.1:8080/mypage/playlist', {
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
          <View style={styles.SectionStyle}>
                      <TouchableOpacity  activeOpacity={0.5}
                      onPress={handleSubmit}
                      >
                        <Image
                              source={require('../../Image/playlist/add.png')}
                              style={styles.imgStyle3}
                        />
                        <Text style={styles.addTextStyle}>
                              음악 추가하기
                        </Text>
                    </TouchableOpacity>
            </View>
        
              {

                    renderPlaylists(music)
              }
              
            </ScrollView>
        


      </KeyboardAvoidingView>
    );
            }
};

export default PlayListMusicScreen;

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
  SectionStyle: {
    flex:1,
    flexdirection: 'row',
    justifyContent:'space-between',
    alignContent: 'center',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    height: 100,
  },

  body:{
    flex:1,
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
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
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
 imgStyle2:{

  width: '30%',
  height: 50,
  resizeMode: 'contain',
  position: 'relative',
  top:30,
  left:260
},
imgStyle3:{

  width: '30%',
  height: 100,
  resizeMode: 'contain',
  position: 'absolute',
  left:0
},
 playlistTextStyle:{
    width: '50%',
    height: 100,
    position:'absolute',
    top:45,
    right:0
 },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  registrationStyle: {
    justifyContent:'center'
  },
  addTextStyle:{
    width: '60%',
    height: 100,
    position:'absolute',
    top:40,
    fontSize:20,
    right:10
  },

  
});