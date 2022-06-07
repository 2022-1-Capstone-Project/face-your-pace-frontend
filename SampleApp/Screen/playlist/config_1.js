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


const Config_screen1 = ({route,navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const {music_id,music_title,music_length} = route.params;
    console.log(music_length);

    const [start_m, setStart_m] = useState('');
    const [start_s, setStart_s] = useState('');
    const [finish_m, setFinish_m] = useState('');
    const [finish_s, setFinish_s] = useState('');
    const [repeat, setRepeat] = useState('');
    const [bpm, setBpm] = useState('');
    const [loading, setLoading] = useState(false);
  
    const start_s_Ref = createRef();
    const finish_m_Ref = createRef();
    const finish_s_Ref = createRef();
    const repeat_Ref = createRef();

    
    const handleSubmit=()=>{

      var start_minute;
      var start_second;

      var finish_minute;
      var finish_second;

      if(start_s>=60||finish_s>=60||isNaN(start_s)||isNaN(finish_s)||isNaN(start_m)||isNaN(finish_m)){
        alert("시작시간과 종료시간에 잘못된 값을 입력하셨습니다")
      }

      if(start_m>=finish_m){
        alert("시작 시간이 종료 시간보다 늦어선 안됩니다.");
        return;
      }

      if(start_m==finish_m&&start_s>=finish_s){
        alert("시작 시간이 종료 시간보다 늦어선 안됩니다.");
        return;
      }

      var minute = Math.floor(music_length/60);
      var second = music_length%60;

      if(start_m>minute||finish_m>minute){
        alert("음악의 재생 길이보다 더 긴 시간을 입력값으로 할 수 없습니다!");
        return;
      }

      
      if(start_m==minute&&start_s>second){
        alert("음악의 재생 길이보다 더 긴 시간을 입력값으로 할 수 없습니다!");
        return;
      }


      if(finish_m==minute&&finish_s>second){
        alert("음악의 재생 길이보다 더 긴 시간을 입력값으로 할 수 없습니다!");
        return;
      }

      if(start_m>=0&&start_m<=9){
        start_minute = "0"+start_m;
      }
      else{
        start_minute = start_m;
      }
      if(start_s>=0&&start_s<=9){
        start_second = "0"+start_s;
      }
      else{
        start_second = start_s;
      }
      if(finish_m>=0&&finish_m<=9){
        finish_minute = "0"+finish_m;
      }
      else{
        finish_minute = finish_m;
      }
      if(finish_s>=0&&finish_s<=9){
        finish_second = "0"+finish_s;
      }
      else{
        finish_second = finish_s;
      }
      //alert(formBody);
      //현재는 3000 포트 번호로 되어 있는데 로컬에서 구동하는 백엔드 서버의 포트 번호에 따라 3000값을 바꾸시면 됩니다.
     
      let dataToSend = {musicStart: start_minute+':'+start_second,
      musicEnd:finish_minute+':'+finish_second,target_bpm:bpm};

      var formBody = [];
      for (var key in dataToSend) {
        var value = dataToSend[key];
        formBody.push(key + '=' + value);
      }
      formBody = formBody.join('&');

      console.log(formBody);
      setLoading(true);
      axios({
        method:"POST",
        url: 'http://52.41.225.196:8081/api/music/'+music_id+'/edit',
        data:formBody,
    }).then((res)=>{
      if (res.data==true) {
        alert("음악 설정 변경에 성공했습니다..");
        setLoading(false);
        navigation.replace('TopTracks',{params:{user_id:userId,user_number:userNumber}});
      }
      else{
        setLoading(false);
        alert('음악설정 변경에 실패했습니다.');
      }
    }).catch(error=>{
      setLoading(false);
        console.log(error);
        throw new Error(error);
    });
    
    }
  //initialArr = fetchPlayListData();
  return (

    
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} 
      enabled style={styles.mainBody} >
        <Loader loading={loading} />
        <View style={styles.header}>
          

        <Text style={styles.headerTextStyle}> 노래제목 : {music_title}</Text>
        <Text style={styles.headerTextStyle}> 음악 재생길이 : {Math.floor(music_length/60)} 분 {music_length%60}초</Text>
        </View>
          <ScrollView style={{ width:'100%',flex:1}}>
            <Text style={styles.bodyText1}>음악 재생 구간 설정</Text>

          
            <View style={styles.SectionStyle}>
                <Text style={{fontSize:20}}>시작 지점 : </Text>

                <TextInput style={styles.inputStyle}
                  label="minute"
                    onChangeText={(start_m) => setStart_m(start_m)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    maxlength={3}
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
                <Text style={{fontSize:20}}>목표 BPM : </Text>

                <TextInput style={styles.inputStyle}
                  label="minute"
                    onChangeText={(bpm) => setBpm(bpm)}
                    underlineColorAndroid="#f000"
                    keyboardType="numeric"
                    returnKeyType="next"
                    maxlength={3}
                    onSubmitEditing={() =>
                      start_s_Ref.current &&
                      start_s_Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                <Text style={{fontSize:20, left : 180,top:-70}}> BPM </Text>
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

export default Config_screen1;

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
    left:45
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