// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable
} from 'react-native';
import {musiclibrary} from '../../data';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
  RepeatMode,
} from 'react-native-track-player';

import PlayIcon from '../../Image/music/play.png';
import PauseIcon from '../../Image/music/pause.png';
import PlayerModal from '../../components/TrackPlayerScreen';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Loader from '../Components/Loader';
import { useNavigation } from '@react-navigation/native';


const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.RemotePlay,
  Event.RemotePause,
];


const MusicAddScreen = (props) => {
  const userId = props.userId;
  const playlist_title  = props.playlist_title;
  const [music,setMusic] = useState(props.music);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const [userNumber,setUserNumber] = useState(0);
  var value = "";
  console.log(playlist_title);

  AsyncStorage.getItem('user_id').then((val) =>
  setUserId(val));

  AsyncStorage.getItem('user_number').then((val) =>
  setUserNumber(val));
  AsyncStorage.getItem('playlist_title').then((val) =>
  setTitle(val));
  /*const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(musiclibrary);
  };
  useEffect(() => {
    setup();
  }, []);
*/


const onSubmitMusic = (id)=>{

  console.log(id);
  console.log(title);
 let dataToSend = {name: title, musicId: id};
  var formBody = [];
  for (var key in dataToSend) {
    var value = dataToSend[key];
    formBody.push(key + '=' + value);
  }
  formBody = formBody.join('&');


  axios.post('http://52.41.225.196:8081/api/playList/music/add', formBody)
    //axios.post('http://127.0.0.1:8080/auth/login', formBody)
    .then( function(response){
      setLoading(false);
      if (response.data!=false) {
        console.log("asdfasdf");
        alert("음악 추가에 성공하였습니다.");
       
        navigation.replace('PlayListScreen',{params:{user_id:userId,user_number:userNumber}});
      }

    }
      )
    .catch(error => {
        //setErrortext('Error:'+ error.message);
        setLoading(false);
        console.log(error);
    });
};


  //AsyncStorage.getItem('user_id').then((val) =>
 // value=val);
  /*let dataToSend = {userId:userId};
    var formBody = [];
    for (var key in dataToSend) {
      var value = dataToSend[key];
      formBody.push(key + '=' + value);
    }
    formBody = formBody.join('&');*/
  



  



  const renderPlaylists=(music)=> {

  
    const imgUrl= require('../../Image/playlist/music2.png')

    if(music!=[]||music!=null){
      return music.map((item,index) => {
          return (
            <View>
              <TouchableOpacity key={item.id}
              onPress={() => onSubmitMusic(item.id)}>
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

            </View>
            
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
      return(

        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <Text> 추가할 음악을 터치해주세요.</Text>
        <View style={{flex: 1,backgroundColor:'white'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent:'center',
            }}>
            
  
            {
              renderPlaylists(props.music)
            }
              
          </View>
         
        </View>
        </ScrollView>
      
      </SafeAreaView>
    );

    }

};


const styles = StyleSheet.create({

imgStyle:{

  flex: 1,
  height:'100%',
  width:100,
  left:20,
  resizeMode: 'contain',
},
imgStyle2:{

  flex: 1,
  height:'100%',
  width:100,
  left:20,
  resizeMode: 'contain',
},
imgStyle3:{

  width: '30%',
  height: 50,
  resizeMode: 'contain',
  position: 'relative',
  top:-80,
  left:260
},
SectionStyle: {
  flexDirection: 'row',
  height: 100,

},
addTextStyle:{
  width: '60%',
  position:'absolute',
  top:30,
  left:150,
  fontSize:20,
},
textStyle1:{
  width: '100%',
  height: 100,
  fontSize:20,
},


playlistTextStyle:{
width: '100%',
width:250,
height: 100,
position:'absolute',
top:20,
fontSize:20,
left:100,
},
errorTextStyle: {
color: 'red',
textAlign: 'center',
fontSize: 14,
},
registrationStyle: {
justifyContent:'center'
},

container: {
  flex: 1,
  backgroundColor: '#191414',
},
musicTitle: {
  fontSize: 22,
  color: '#fff',
  fontWeight: '500',
  marginTop: 12,
  marginHorizontal: 20,
  marginBottom: 1,
},
artisteTitle: {
  fontSize: 16,
  color: '#fff',
  opacity: 0.8,
  marginHorizontal: 20,
  marginBottom: 12,
  marginTop: 1,
},
widgetContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 0,
  height: 60,
  width: '100%',
  backgroundColor: '#5E5A5A',
},
widgetMusicTitle: {
  fontSize: 18,
  color: '#fff',
  fontWeight: '500',
  marginTop: 12,
  marginHorizontal: 10,
  marginBottom: 1,
},
widgetArtisteTitle: {
  fontSize: 14,
  color: '#fff',
  opacity: 0.8,
  marginHorizontal: 10,
  marginBottom: 12,
  marginTop: 1,
},
widgetImageStyle: {
  width: 55,
  height: 60,
  marginTop: 3,
},
linearGradient: {
  width: '100%',
  height: 250,
  justifyContent: 'center',
  alignItems: 'center',
},
shuffleButton: {
  color: '#fff',
  fontSize: 24,
  fontWeight: 'bold',
},
shuffleButtonContainer: {
  paddingVertical: 15,
  paddingHorizontal: 35,
  borderRadius: 40,
  alignSelf: 'center',
  backgroundColor: '#1DB954',
},



});
export default MusicAddScreen;