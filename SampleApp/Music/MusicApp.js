
import React, {useEffect} from 'react';
import TrackListScreen from './TrackListScreen';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerScreen from '../components/TrackPlayerScreen';
import {musiclibrary} from '../data';

export default function MusicApp() {
  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(musiclibrary);
  };
  useEffect(() => {
    setup();
  }, []);
  return < TrackListScreen />;}
