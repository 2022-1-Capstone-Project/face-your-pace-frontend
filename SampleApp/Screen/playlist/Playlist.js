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
import { useIsFocused } from "@react-navigation/native";



const PlayListScreen = (props) => {
  const navigation = props.navigation;
  //fetchPlayListData();
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  const [userNumber,setUserNumber] = useState('');
  const [playlist,setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId,setUserId] = useState('');



  useEffect(() => {

    var data = "";
    const number = props.route.params.user_number;
   // setUserNumber(val);
    

    async function fetchPlayList() {
      const response = await axios({
        method:"GET",
        //url: 'http://127.0.0.1:8080/api/mypage/playlist/'+number
        url: 'http://52.41.225.196:8081/api/mypage/playlist/'+number
      }).catch(error=>{
        setLoading(false);
        alert("플레이리스트 로딩에 오류가 발생했습니다.");
      });
      
      setPlaylist(response.data);
      setLoading(false);
    }
    fetchPlayList();
  }, []);

  const renderPlaylists=(playlist)=> {

    //const navigation = useNavigation();
    
  
      return playlist.map((item) => {
          return (
            <View key = {item.id} style={styles.SectionStyle}>
              <TouchableOpacity  activeOpacity={0.5}
                onPress={()=>navigation.navigate("PlayListMusicScreen",{
                  playlist_title:item.name
                })}
              >
                <Image
                      source={require('../../Image/playlist/music-playlist.jpg')}
                      style={styles.imgStyle}
                />
                <Text style={styles.playlistTextStyle}>
                      {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
      });
    
  };


  /*axios.post('http://127.0.0.1:8080/api/mypage/playlist', formBody)
  .then( function(response){
    setLoading(false);
    if (response.data==true) {
      AsyncStorage.setItem('user_email', userId);
      alert("로그인에 성공하였습니다.");
      navigation.replace('DrawerNavigationRoutes');
    }
    else{
      alert('아이디와 비밀번호를 확인해주시기 바랍니다!');
    }
  }
    )
  .catch(error => {
      //setErrortext('Error:'+ error.message);
      NaverLogin.logout();
      setNaverToken("");
  });*/
  //   imgUrl: require('../../Image/playlist/music-playlist.jpg'),

  const handleSubmit=()=>{
    navigation.navigate(
      'PlayListAddScreen',{params:{user_id:userId}}
    )
    
  }
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
 

  if (loading) {
        return (
          <View>
            <Loader loading={loading} />
          </View>
          )
  }
  else{
  return (

        <View style={styles.body}>
        <Loader loading={loading} />
          <ScrollView style={{ width:'100%',flex:1}}>

                <View style={styles.SectionStyle}>
                    <TouchableOpacity  activeOpacity={0.5}
                      onPress={handleSubmit}
                    >
                      <Image
                            source={require('../../Image/playlist/add.png')}
                            style={styles.imgStyle2}
                      />
                      <Text style={styles.addTextStyle}>
                            플레이리스트 추가하기
                      </Text>
                  </TouchableOpacity>
                </View>
                {

                  renderPlaylists(playlist)
                }

               
               
            
          </ScrollView>
        </View>


  );
              }
};

export default PlayListScreen;

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
  height: 100,
  resizeMode: 'contain',
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

 addTextStyle:{
  width: '60%',
  height: 100,
  position:'absolute',
  top:40,
  fontSize:20,
  right:10
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