// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect,createRef} from 'react';

import axios from 'axios';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Searchbar,Text } from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';


const MusicAddScreenMain = ({route,navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const {playlist_id,music_title} = route.params;
  const [musicName, setMusicName] = useState('');

musicName
    var [start_m, setStart_m] = useState('');
    var [start_s, setStart_s] = useState('');
    var [finish_m, setFinish_m] = useState('');
    var [finish_s, setFinish_s] = useState('');
    var [repeat, setRepeat] = useState('');
    var [bpm, setBpm] = useState('');
    const start_m_Ref = createRef();
    const start_s_Ref = createRef();
    const finish_m_Ref = createRef();
    const finish_s_Ref = createRef();
    const repeat_Ref = createRef();
    const bpm_Ref = createRef();


    const handleSubmit=()=>{
      if (!start_m) {
        alert('시작 시간을 입력해주시기 바랍니다.');
        return;
      }
      if(!start_s){
        alert('시작 시간을 입력해주시기 바랍니다.');
        return;
      }
      if (!finish_m) {
        alert('종료 시간을 입력해주시기 바랍니다.');
        return;
      }
      if(!finish_s){
        alert('종료 시간을 입력해주시기 바랍니다.');
        return;
      }
      if (!repeat) {
        alert('반복 횟수를 입력해주시기 바랍니다.');
        return;
      }

      if(0<=start_m&&start_m<=9){
        start_m = '0'+start_m;
      }

      if(0<=start_s&&start_s<=9){
        start_s = '0'+start_s;
      }

      if(0<=finish_m&&finish_m<=9){
        finish_m = '0'+finish_m;
      }

      if(0<=finish_s&&finish_s<=9){
        finish_s = '0'+finish_s;
      }

      if(start_m>finish_m){
        alert('시작 시간과 마지막 시간의 순서가 잘못되었습니다');
        return;
      }

      if(start_m==finish_m){
        if(start_s>finish_s){
          alert('시작 시간과 마지막 시간의 순서가 잘못되었습니다');
          return;
        }
      }
      var startTime = '00:'+start_m+':'+start_s;
      var endTime = '00:'+finish_m+':'+finish_s;

      //alert(formBody);
      //현재는 3000 포트 번호로 되어 있는데 로컬에서 구동하는 백엔드 서버의 포트 번호에 따라 3000값을 바꾸시면 됩니다.
     
      var body = new FormData();
      body.append('musicName',musicName);
      body.append('musicStart',startTime);
      body.append('musicEnd',endTime);
      body.append('musicRepeat',repeat);

      let dataToSend = {musicName: musicName, musicStart: startTime,musicEnd:endTime,musicRepeat:repeat};
      var formBody = [];
      for (var key in dataToSend) {
        var value = dataToSend[key];
        formBody.push(key + '=' + value);
      }
      formBody = formBody.join('&');
      alert(formBody);
      axios({
        method:"POST",
        url: 'http://127.0.0.1:8080/api/music/add',
        data:formBody,
    }).then((res)=>{
      if (res.data==true) {
        alert("음악 추가에 성공하였습니다.");
          AsyncStorage.getItem('user_id').then((value) =>
          navigation.replace(
            'TabNavigationRoutes',{params:{user_id:value}}
          ),
        );
      }
      else{
        alert('음악 추가에 실패했습니다.');
      }
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
    
    }
  //initialArr = fetchPlayListData();
  return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled style={styles.mainBody} >
        <View style={styles.header}>
          

        <Text style={styles.headerTextStyle}> 노래제목 :</Text>
        <TextInput style={styles.inputStyle3}
                    onChangeText={(musicName) => setMusicName(musicName)}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                    maxlength={2}
                    onSubmitEditing={() =>
                      start_m_Ref.current &&
                      start_m_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
        </View>
          <ScrollView style={{ width:'100%',flex:1}}>
            <Text style={styles.bodyText1}>음악 재생 구간 설정</Text>

          
            <View style={styles.SectionStyle}>
                <Text style={{fontSize:20}}>시작 지점 : </Text>

                <TextInput style={styles.inputStyle}
                    onChangeText={(start_m) => setStart_m(start_m)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    maxlength={2}
                    ref={start_m_Ref}
                    onSubmitEditing={() =>
                      start_s_Ref.current &&
                      start_s_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 180,top:-70}}> 분 </Text>

                <TextInput style={styles.inputStyle2}
                  label="second"
                    onChangeText={(start_s) => setStart_s(start_s)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    ref={start_s_Ref}
                    maxlength={2}
                    onSubmitEditing={() =>
                      finish_m_Ref.current &&
                      finish_m_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 280,top:-135}}> 초 </Text>
          
            </View> 

            <View style={styles.SectionStyle}>
                <Text style={{fontSize:20}}>종료 지점 : </Text>

                <TextInput style={styles.inputStyle}
                  label="minute"
                    onChangeText={(finish_m) => setFinish_m(finish_m)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    ref={finish_m_Ref}
                    maxlength={3}
                    onSubmitEditing={() =>
                      finish_s_Ref.current &&
                      finish_s_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 180,top:-70}}> 분 </Text>

                <TextInput style={styles.inputStyle2}
                  label="second"
                    onChangeText={(finish_s) => setFinish_s(finish_s)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    maxlength={2}
                    ref={finish_s_Ref}
                    onSubmitEditing={() =>
                      repeat_Ref.current &&
                      repeat_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 280,top:-135}}> 초 </Text>
          
            </View> 

            
            <View style={styles.SectionStyle}>
                <Text style={{fontSize:20}}>재생 횟수 : </Text>

                <TextInput style={styles.inputStyle}
                  label="repeat"
                    onChangeText={(repeat) => setRepeat(repeat)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    maxlength={2}
                    ref={repeat_Ref}
                    onSubmitEditing={() =>
                      start_s_Ref.current &&
                      start_s_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 180,top:-70}}> 회 </Text>
          
            </View> 

      

            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmit}
            >
            <Text style={styles.buttonTextStyle}>저장하기</Text>
          </TouchableOpacity>
          </ScrollView>


    </KeyboardAvoidingView>
  );
};

export default MusicAddScreenMain;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header:{
    height: 40,
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal:20,
  },
  headerTextStyle:{

    fontSize:20,
    top:20,
    left:20
  },
  bodyText1:{

    fontSize:30,
    left:20,
    marginBottom:30
  },
  SectionStyle: {
    flex:1,
    flexdirection: 'row',
    justifyContent:'space-between',
    marginLeft: 35,
    marginRight: 35,
    height: 100,
  },

  body:{
    flexDirection: 'column',
    flex:1,
    justifyContent: 'center', alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle2: {
    backgroundColor: '#03C75A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#dadae8',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
    borderWidth: 1,
  },
  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    height:40,
    color: 'black',
    width:50,
    left:120,
    top:-35,
    borderWidth: 1,
    borderRadius: 15,
    fontSize:15,
    textAlign:'center',
    borderColor: '#dadae8',
  },

  inputStyle3: {
    height:40,
    color: 'black',
    width:200,
    left:120,
    top:-10,
    borderWidth: 1,
    borderRadius: 15,
    fontSize:15,
    textAlign:'center',
    borderColor: '#dadae8',
  },
  
  inputStyle2: {
    height:40,
    color: 'black',
    width:50,
    left:220,
    top:-100  ,
    borderWidth: 1,
    borderRadius: 15,
    fontSize:15,
    textAlign:'center',
    borderColor: '#dadae8',
  },


  registerTextStyle: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  registerTextStyle1: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 30,
  },
  registerTextStyle2:{
    color: '#1AE162',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 30,

  },


 imgStyle:{

      width: '30%',
      height: 100,
      borderWidth: 5,
      resizeMode: 'contain',
      borderColor: '#dadae8',
      position: 'absolute',
      left:0
 },

 playlistTextStyle:{
    width: '50%',
    height: 100,
    position:'absolute',
    top:50,
    right:0
 },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  registrationStyle: {
    justifyContent:'center'
  }
});