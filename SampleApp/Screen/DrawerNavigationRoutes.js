// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import PlayListScreen from './playlist/Playlist';
import PlayListMusicScreen from './playlist/Playlist_music';
import Config_screen1 from './playlist/config_1';
import Config_screen2 from './playlist/config_2';
import PlayListAddScreen from './playlist/playlist_add';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        
        component={HomeScreen}
  
        options={{
          title: 'Home', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
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
        headerRight: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
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

const DrawerNavigatorRoutes = (props) => {

  const userInfo = props.route.params;
  console.log(userInfo);
  const myName = userInfo.params.user_id;
  props.name = myName;
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        inactiveTintColor: '#ffffff',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#ffffff',
        },
      }}
      screenOptions={{headerShown: false,drawerPosition:'right'}}
      drawerContent={(props)=><CustomSidebarMenu name={myName} {...props}/> }
      
      >
      
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        labelStyle={{color:'#ffffff'}}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="playListScreenStack"
        options={{drawerLabel: 'PlayList Screen'}}
        labelStyle={{color:'#ffffff'}}
        component={playListScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        labelStyle={{color:'#ffffff'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;