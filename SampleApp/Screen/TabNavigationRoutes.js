// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import HomeScreen from './TabScreens/HomeScreen';
import TopTracks from './TabScreens/TopTracks';
import PlayListScreen from './playlist/Playlist';
import PlayListMusicScreen from './playlist/Playlist_music';
import MusicAddScreenMain from './mypage/music_add';
import Config_screen1 from './playlist/config_1';
import Config_screen2 from './playlist/config_2';
import PlayListAddScreen from './playlist/playlist_add';
import MusicAddScreen from './playlist/music_add';
import SettingsScreen from './TabScreens/SettingsScreen';
import UserUpdateScreen from './TabScreens/UserUpdate';
import MusicApp from '../Music/MusicApp';

import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import BPMRecommendScreen from './TabScreens/BPMRecommendScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const homeScreenStack = (props) => {
  const userInfo = props.route.params;
  console.log(userInfo);
  const myName = userInfo.user_id;
  props.name = myName;
  const number = userInfo.user_number;
  return (
    <Stack.Navigator initialRouteName="TopTracks">

    <Stack.Screen
        name="MusicAddScreenMain"
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
        component={TopTracks}
  
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

    <Stack.Screen
        name="Config_screen1"
        initialParams={{user_number: number,user_id:myName}}
        component={Config_screen1}
  
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
      
      <Stack.Screen
        name="TopTracks"
        initialParams={{user_number: number,user_id:myName}}
        component={TopTracks}
  
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


const playListScreenStack = (props) => {
  const userInfo = props.route.params;
  console.log(userInfo);
  const myName = userInfo.user_id;
  props.name = myName;
  const number = userInfo.user_number;
  return (
    <Stack.Navigator initialRouteName="PlayListScreen">
      <Stack.Screen
        name="PlayListScreen"
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
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

const settingScreenStack = (props) => {
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


const UserUpdateScreenStack = (props) => {
  const userInfo = props.route.params;
  console.log(userInfo);
  const myName = userInfo.user_id;
  props.name = myName;
  const number = userInfo.user_number;
  return (
    <Stack.Navigator
      initialRouteName="UserUpdateScreen"
      initialParams={{user_number: number,user_id:myName}}
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
        initialParams={{user_number: number,user_id:myName}}
        component={UserUpdateScreen}
        options={{
          title: '유저 정보 조회', //Set Header Title
        }}
      />


      <Stack.Screen
        name="BPMRecommendScreen"
        initialParams={{user_number: number,user_id:myName}}
        component={BPMRecommendScreen}
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
  const number = userInfo.params.user_number;


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
        }else if (route.name === 'MusicApp') {
          iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }else if (route.name === 'BPMRecommendScreen') {
          iconName = 'thumbs-up';
          return <Ionicons name={iconName} size={size} color={color} />;
        }

        // You can return any component that you like here!
     
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="homeScreenStack" 
      initialParams={{user_number: number,user_id:myName}}
      component={homeScreenStack} />
      <Tab.Screen name="playListScreenStack" 
       initialParams={{user_number: number,user_id:myName}}
      component={playListScreenStack} />
      <Tab.Screen name="UserUpdateScreenStack" 
       initialParams={{user_number: number,user_id:myName}}
      component={UserUpdateScreenStack} />
       <Tab.Screen name="BPMRecommendScreen" 
       initialParams={{user_number: number,user_id:myName}}
      component={BPMRecommendScreen} />

    </Tab.Navigator>
  );
};

export default TabNavigationRoutes;