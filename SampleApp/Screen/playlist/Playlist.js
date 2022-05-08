// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
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

const renderPlaylists=(initialArr)=> {

  const navigation = useNavigation();
  return initialArr.map((item) => {
      return (
        <View key = {item.id} style={styles.SectionStyle}>
          <TouchableOpacity  activeOpacity={0.5}
            onPress={()=>navigation.navigate("PlayListMusicScreen",{
              playlist_id: item.id,
              playlist_title:item.title
            })}
          >
            <Image
                  source={item.imgUrl}
                  style={styles.imgStyle}
            />
            <Text style={styles.playlistTextStyle}>
                  {item.title}
            </Text>
          </TouchableOpacity>
         </View>
      );
  });
};

const fetchPlayListData= ()=>{
  var userId = 4;
  let dataToSend = {userId: userId};
  var formBody = [];
  for (var key in dataToSend) {
    var value = dataToSend[key];
    formBody.push(key + '=' + value);
  }
  formBody = formBody.join('&');

  axios.post('http://127.0.0.1:8080/auth/login', formBody)
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
  });



  };



const PlayListScreen = ({navigation}) => {
  //fetchPlayListData();
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  initialArr = [
    {
      id:1,
      imgUrl: require('../../Image/common/logo.png'),
      title: "플레이리스트1"
    },
    {
      id:2,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트2"
    },
    {
      id:3,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트3"
    },
    {
      id:4,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트4"
    },
    {
      id:5,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트5"
    },
    {
      id:6,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트6"
    },
    {
      id:7,
      imgUrl: require('../../Image/playlist/music-playlist.jpg'),
      title: "플레이리스트7"
    },
  ];
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

 


  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled style={styles.mainBody} >
        <View style={styles.header}>


            <Searchbar
            placeholder="플레이리스트 에서 찾기"
            onChangeText={onChangeSearch}
            value={searchQuery}
            icon={() => <Ionicons name="search-outline" size={30}/>}
          />
          
        </View>
        <View style={styles.body}>
          <ScrollView style={{ width:'100%',flex:1}}>
                {

                  renderPlaylists(initialArr)
                }
            
          </ScrollView>
        </View>


    </KeyboardAvoidingView>
  );
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