import { Dimensions, StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import NewsPage from '../Pages/NewsPage';
import Signup from './Signup';

const HeightDevice = Math.round(Dimensions.get('window').height)


export default function Login() {
  const navigation = useNavigation();

const [ID,setID]=useState('');
const [Password,setPassowrd]= useState('');

const ResetPassowrd = () => {
  navigation.navigate("Reset Password");
};

const Signup = () => {
  navigation.navigate("SignUP");
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (ID !== '' && Password !== '') {
      const response = await axios.post("http://192.168.0.119:3000/login", { ID, Password });

     // const { result, loginId } = response.data; // Access the result and loginId from the response

      // Use the values as needed
      //console.log(result);
      //console.log(loginId);
      
      alert("Login successfully!");
      navigation.navigate('NewsPage');
      
    } else {
      alert("You should fill in all the data!");
    }
  } catch (err) {
    alert("ID Number or Password are not correct!");
  }
};

    return (
    <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center',height:HeightDevice   }}>
     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style = {styles.Container}>
      <Text style={styles.text}>Sign In Now</Text>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="person" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='User ID                         '  keyboardType = 'numeric' onChangeText = {(text) => setID({...ID,ID:text})}></TextInput>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="lock" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='Password'  secureTextEntry ={true} maxLength={18} onChangeText = {(text) => setPassowrd({...Password,Password:text})}></TextInput>
      </View>
        <View style={{flexDirection:'row',width:310}}>
        <Text style= {{ color: '#1B262C'}}>Forget Password? </Text><TouchableOpacity  onPress={ResetPassowrd}><Text style= {{ color: '#3282B8'} }>Reset your Password.</Text></TouchableOpacity>

       <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
    <Text style={styles.appButtonText}>sign in</Text>
  </TouchableOpacity></View>
  <Text style= {{ color: '#1B262C',fontSize:16}}>Don't you have an account? </Text>
  <TouchableOpacity  onPress={Signup}><Text style= {{ color: '#3282B8',fontWeight:'900',fontSize:16}}> Sign Up form here. </Text></TouchableOpacity>
  </View>
  </TouchableWithoutFeedback>
  </View>

    );
  }
  const widthDevice = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({
    
  Container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'column',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor:'#FFF',
    marginTop:-45,
    width:widthDevice+40,
    elevation: 8,

},
inputStyle : {
 backgroundColor : '#FFF',
 height : 50,
 borderWidth : 1.5,
 borderColor : '#DCDCDC',
 borderRadius : 25,
 padding : 15,
 margin : 5,
 width:350,
 flexDirection:'row',
},
text : {
  alignSelf:'center',
  fontSize : 26,
  color:'#3282B8',
  fontWeight : '700',
  width : 150,
  marginBottom : 10,
  shadowColor: "#3282B8",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
}
,appButtonContainer: {
  elevation: 8,
  backgroundColor: '#3282B8',
  borderRadius: 20,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginBottom: 20,
  width :350,
  height : 50,
  marginTop : 80,
  marginLeft : -270,
  shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,

},
appButtonText: {
  fontSize: 18,
  color: "#FFF",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
  })