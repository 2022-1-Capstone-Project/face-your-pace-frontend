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
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';




const HomeScreen = ({navigation}) => {
  const [music,setMusic] = useState([]);


  var value = "";
  AsyncStorage.getItem('user_id').then((val) =>
  value=val);

  useEffect(() => {
    async function fetchMusic() {
      const response = await axios({
        method:"GET",
        url: 'http://127.0.0.1:8080/api/music/list',
      });
      console.log(response.data);

      setMusic(response.data);
    }
    fetchMusic();
  }, [navigation]);



  const renderPlaylists=(music)=> {

  
    const imgUrl= require('../../Image/playlist/music2.png')

    if(music!=[]||music!=null){
      return music.map((item) => {
          return (
            <View key = {item.id} style={styles.SectionStyle}>
              <View>
                <Image
                      source={imgUrl}
                      style={styles.imgStyle}
                />
                <Text style={styles.playlistTextStyle}>
                      {item.musicName}
                </Text>
    
              </View>
            </View>
          );
        });
    
    }
  };

  const handleSubmit=()=>{
    navigation.navigate(
      'MusicAddScreenMain',{params:{user_id:value}}
    )
    
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
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
          {!music&&
             <View style={styles.SectionStyle}>
             <Text style={styles.textStyle1}>
                     이런 저장된 음악이 없으시군요...
             </Text>
           </View>
          
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
    </SafeAreaView>
  );
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
width: '80%',
height: 100,
position:'absolute',
top:35,
fontSize:20,
right:-80
},
errorTextStyle: {
color: 'red',
textAlign: 'center',
fontSize: 14,
},
registrationStyle: {
justifyContent:'center'
},

});
export default HomeScreen;