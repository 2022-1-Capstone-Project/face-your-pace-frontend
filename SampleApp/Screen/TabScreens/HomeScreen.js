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

import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
  RepeatMode,
} from 'react-native-track-player';

import PlayIcon from '../../Image/music/play.png';
import PauseIcon from '../../Image/music/pause.png';
import {musiclibrary} from '../../data';
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


const HomeScreen = (props) => {
  const [music,setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = props.navigation;
  const userId = props.route.params.user_id
  var value = "";


  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [mode, setMode] = useState('shuffle');

  const {position} = useProgress();

  /*const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(musiclibrary);
  };
  useEffect(() => {
    setup();
  }, []);
*/
useEffect(
  () =>
    mode === 'off'
      ? TrackPlayer.setRepeatMode(RepeatMode.Queue)
      : TrackPlayer.setRepeatMode(RepeatMode.Off),
  [mode],
);


const setup = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.add(musiclibrary);
};
useEffect(() => {
  setup();
}, []);

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


  



  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      console.log(event.type);
    }
    if (event.type === Event.RemotePlay) {
      console.log('event.type');
    }
    if (event.type === Event.RemotePause) {
      console.log(event.type);
    }
  });

  const onSelectTrack = async (selectedTrack, index) => {
    setSelectedMusic(selectedTrack);
    setTimestamp(0);
    setSelectedMusicIndex(index);
    TrackPlayer.skip(index);
    playOrPause();
  };

  TrackPlayer;

  const playOrPause = async isCurrentTrack => {
    const state = await TrackPlayer.getState();
    if (state === State.Paused && isCurrentTrack) {
      setIsPlaying(!isPlaying);
      TrackPlayer.play();
      return;
    }

    if (state === State.Playing && isCurrentTrack) {
      setIsPlaying(!isPlaying);
      TrackPlayer.pause();
      return;
    }
    setIsPlaying(true);
    TrackPlayer.play();
  };

  const setVolume = (volume)=>{
    TrackPlayer.setVolume(volume);
  }
  const onSeekTrack = newTimeStamp => {
    TrackPlayer.seekTo(newTimeStamp);
  };

  const onPressNext = () => {
    setSelectedMusic(
      musiclibrary[(selectedMusicIndex + 1) % musiclibrary.length],
    );
    setSelectedMusicIndex(selectedMusicIndex + 1);
    TrackPlayer.skipToNext();
    playOrPause();
  };

  const onPressPrev = () => {
    if (selectedMusicIndex === 0) {
      return;
    }
    setSelectedMusic(
      musiclibrary[(selectedMusicIndex - 1) % musiclibrary.length],
    );
    setSelectedMusicIndex(selectedMusicIndex - 1);
    TrackPlayer.skipToPrevious();
    playOrPause();
  };

  const renderSingleMusic = ({item, index}) => {
    return (
      <>
        {index === 0 && <PlaylistImageView />}
        <TouchableOpacity onPress={() => onSelectTrack(item, index)}>
          <View>
            <Text style={styles.musicTitle}>{item.title}</Text>
            <Text style={styles.artisteTitle}>{item.artist}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
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
            <TouchableOpacity
            onPress={() => onSelectTrack(item, index)}>
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

  const handleSubmit=()=>{
    navigation.navigate(
      'MusicAddScreenMain',{params:{user_id:userId}}
    )
    
  }



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

{selectedMusic && (
        <PlayerModal
          onCloseModal={() => setisPlayerModalVisible(false)}
          isVisible={isPlayerModalVisible}
          isPlaying={isPlaying}
          playOrPause={playOrPause}
          selectedMusic={selectedMusic}
          onSeekTrack={onSeekTrack}
          timestamp={Math.round(position)}
          onPressNext={onPressNext}
          onPressPrev={onPressPrev}
          playbackMode={mode}
          setVolume = {setVolume}
          onClickLoop={() =>
            mode === 'loop' ? setMode('loop') : setMode('off')
          }
        />
      )}
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={{flex: 1,backgroundColor:'white'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent:'center',
            }}>
            
  
            {
              renderPlaylists(music)
            }
           


       
  
  
         
            <TouchableOpacity  activeOpacity={0.5} style={{height:100}}
                       onPress={handleSubmit}
                      >
                        <Image
                              source={require('../../Image/playlist/add.png')}
                              style={styles.imgStyle2}
                        />
                        <Text style={styles.addTextStyle}>
                              음악 추가하기
                        </Text>
                  
              </TouchableOpacity>

              
          </View>
         
        </View>
        </ScrollView>
        
        {selectedMusic && (
            <Pressable onPress={() => setisPlayerModalVisible(true)}>
              <View style={[styles.widgetContainer, {}]}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    resizeMode="cover"
                    source={{uri: selectedMusic.artwork}}
                    style={styles.widgetImageStyle}
                  />
                  <View>
                    <Text style={styles.widgetMusicTitle}>
                      {selectedMusic.title}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => playOrPause(true)}>
                  <Image
                    source={isPlaying ? PauseIcon : PlayIcon}
                    style={{height: 30, tintColor: '#fff', width: 30, right:50,}}
                  />
                </Pressable>
              </View>
            </Pressable>
           )}
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

  flex: 1,
  height:'100%',
  width:100,
  top:-40,
  left:170,
  resizeMode: 'contain',
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
export default HomeScreen;