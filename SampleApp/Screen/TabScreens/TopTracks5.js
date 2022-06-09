
import HomeScreen from './HomeScreen';
import PlayListMusicScreen  from '../playlist/Playlist_music';
import TrackPlayer from 'react-native-track-player';
import React, {useState, createRef, useEffect } from 'react';
import axios from 'axios';
import  {musiclibrary} from '../../data';
export default function TopTracks5(props) {
    const [music, setMusic] = useState([]);
    const userId = props.route.params.user_id;
    const playlist_title = props.route.params.playlist_title;
    if(props.route.params.music!=undefined){
      console.log("music 세팅 성공");
      setMusic(props.route.params.music);
    }
    useEffect(() => {
      const loadData = async () => {
        try {
          const url = 'http://52.41.225.196:8081/api/music/list/'+userId+'/'+playlist_title;
          const res = await axios.get(url);
          setMusic(
            res.data.map((track,index) => ({
              duration: Number(track.length),
              title: track.title,
              artist: '',
              album: '',
              genre: '',
              idx: index,
              date: '2014-05-20T07:00:00+00:00',
              id: track.id,
              url: 'https://fyp-music.s3.ap-northeast-2.amazonaws.com/music/'+track.s3Title, 
              artwork: track.musicImg_url
            }))
          );

        } catch (error) {
          console.error(error);
        }
      };
  
      loadData();
      

    }, []);
  
    return <PlayListMusicScreen music={music} userId = {userId} playlist_title = {playlist_title}/>;
  }