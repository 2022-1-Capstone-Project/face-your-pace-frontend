// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import Screens
import HomeScreen from './TabScreens/HomeScreen';
import PlayListScreen from './playlist/Playlist';
import PlayListMusicScreen from './playlist/Playlist_music';
import MusicAddScreenMain from './mypage/music_add';
import Config_screen1 from './playlist/config_1';
import Config_screen2 from './playlist/config_2';
import PlayListAddScreen from './playlist/playlist_add';
import MusicAddScreen from './playlist/music_add';
import SettingsScreen from './TabScreens/SettingsScreen';
import UserUpdateScreen from './TabScreens/UserUpdate';
import TrackListScreen from '../Music/TrackListScreen';


import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">

    <Stack.Screen
        name="MusicAddScreenMain"
        component={MusicAddScreenMain}
        options={{
          title: 'music', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="HomeScreen"
        
        component={HomeScreen}
  
        options={{
          title: 'Home', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
            alignContent: 'center',
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            textAlign:'center',
            justifyContent: 'center',
            alignContent: 'center',
          },
          defaultNavigationOptions: {
            headerTitleAlign: 'center'
        }
        }}
      />


    </Stack.Navigator>
  );
};


const playListScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="PlayListScreen">
      <Stack.Screen
        name="PlayListScreen"
        component={PlayListScreen}
        options={{
          title: 'playlist', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

<Stack.Screen
        name="PlayListMusicScreen"
        component={PlayListMusicScreen}
        options={{
          title: 'music', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

    <Stack.Screen
        name="PlayListAddScreen"
        component={PlayListAddScreen}
        options={{
          title: 'music', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

<Stack.Screen
        name="MusicAddScreen"
        component={MusicAddScreen}
        options={{
          title: 'music', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

<Stack.Screen
        name="Config_screen1"
        component={Config_screen1}
        options={{
          title: 'music', //Set Header Title
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />

      
    <Stack.Screen
        name="Config_screen2"
        component={Config_screen2}
        options={{
          title: 'music', //Set Header Title
 
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            textAlign:'center',
            fontWeight: 'bold' //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


const UserUpdateScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="UserUpdateScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}>
      <Stack.Screen
        name="UserUpdateScreen"
        component={UserUpdateScreen}
        options={{
          title: '유저 정보 조회', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


const TabNavigationRoutes = (props) => {

  const userInfo = props.route.params;
  console.log(userInfo);
  const myName = userInfo.params.user_id;
  props.name = myName;

  return (
    <Tab.Navigator
    tabBarOptions={{ showLabel: false }}
    screenOptions={({ route }) => ({
      headerShown:false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'homeScreenStack') {
          iconName = focused
            ? 'home'
            : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'playListScreenStack') {
          iconName = focused ? 'playlist' : 'playlist';
          return <SimpleLineIcons name={iconName} size={size} color={color} />;
        }else if (route.name === 'UserUpdateScreenStack') {
          iconName = focused ? 'md-person' : 'md-person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }else if (route.name === 'TrackListScreen') {
          iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }

        // You can return any component that you like here!
     
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="homeScreenStack" component={homeScreenStack} />
      <Tab.Screen name="playListScreenStack" component={playListScreenStack} />
      <Tab.Screen name="UserUpdateScreenStack" component={UserUpdateScreenStack} />
      <Tab.Screen name="TrackListScreen" component={TrackListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigationRoutes;