// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/member/SplashScreen';
import LoginScreen from './Screen/member/LoginScreen';
import RegisterScreen from './Screen/member/RegisterScreen';
import RegisterScreen_id from './Screen/member/RegisterScreen_id';
import RegisterScreen_email from './Screen/member/RegisterScreen_email';
import RegisterScreen_nickname from './Screen/member/RegisterScreen_nickname';
import RegisterScreen_pw from './Screen/member/RegisterScreen_pw';
import RegisterScreen_personal_info from './Screen/member/RegisterScreen_personal_info';


import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import MainLoginScreen from './Screen/member/MainLoginScreen';

import Icon from 'react-native-vector-icons/dist/Ionicons';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
       <Stack.Screen
        name="MainLoginScreen"
        component={MainLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: '회원가입하기', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />


    </Stack.Navigator>
  );
};



const Register = () => {

 return(
<Stack.Navigator initialRouteName="RegisterScreen_id">
      <Stack.Screen
        name="RegisterScreen_id"
        component={RegisterScreen_id}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen_email"
        component={RegisterScreen_email}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen_nickname"
        component={RegisterScreen_nickname}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen_pw"
        component={RegisterScreen_pw}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen_personal_info"
        component={RegisterScreen_personal_info}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="MainLoginScreen"
        component={MainLoginScreen}
        options={{headerShown: false}}
      />


    </Stack.Navigator>

 );


};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
          
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;