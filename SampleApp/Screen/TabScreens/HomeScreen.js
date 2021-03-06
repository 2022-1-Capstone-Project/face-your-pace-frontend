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


const HomeScreen = (props) => {
  const userId = props.userId;
  const [music,setMusic] = useState(props.music);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
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






async function setUp(music){
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.add(music);
  
}

useEffect(()=>{
  console.log(props.music);
    setUp(props.music).catch(error=>{

      console.log(error);
    });
},[props.music]);



  



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
    if(selectedMusicIndex==(props.music.length-1)){
      return;
    }

    setSelectedMusic(
      props.music[(selectedMusicIndex + 1) % props.music.length],
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
      props.music[(selectedMusicIndex - 1) % props.music.length],
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
            <View style={{flex:1}}>
              <TouchableOpacity key={item.id}
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
              <TouchableOpacity
                onPress={()=>navigation.navigate("Config_screen1",{
                  music_id: item.id,
                  music_title:item.title,
                  music_length:item.duration
                })}>
    
                  <Image
                        source={require('../../Image/playlist/settings.png')}
                        style={styles.imgStyle3}
                  />
              </TouchableOpacity>

            </View>
            
          );
        });
    
    }
  };

  const handleSubmit=()=>{
    TrackPlayer.pause();
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
              renderPlaylists(props.music)
            }
           


       
  
  
         
            <TouchableOpacity  activeOpacity={0.5} style={{height:100}}
                       onPress={handleSubmit}
                      >
                        <Image
                              source={require('../../Image/playlist/add.png')}
                              style={styles.imgStyle2}
                        />
                        <Text style={styles.addTextStyle}>
                              ?????? ????????????
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

  width: '100%',
  height: 50,
  resizeMode: 'contain',
  position: 'relative',
  top:0,
  left:150
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