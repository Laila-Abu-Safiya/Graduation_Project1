import {Dimensions, StyleSheet, Text, View,TouchableOpacity,TextInput,Image } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Button,TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
//import ImagePicker from 'react-native-image-picker';
//const ImagePicker = require('react-native-image-picker');


export default function Signup() {
const navigation = useNavigation();
const [imageUri, setImageUri] = useState(null);

const Signin = () => {
  navigation.navigate("LOGIN");
};
  const [Values,setValues] = useState({
ID:'',
Name:'',
Email:'',
Password:'',
Location:''
  })
const [err, setErr]=useState(null);

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const handleChange = e =>{
 
  setValues(prev=>({...prev,[e.target.name]:e.target.value}))
}

const handleSubmit =async e=>{
  e.preventDefault()
  //console.log(Values)
  try{
    if(Values.ID != '' && Values.Name != '' &&Values.Email != '' &&Values.Password != '' &&Values.Location != '' ){
      if(Values.Password.length >= 8){
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Values.Email)){
        alert("Invalid Email!")
      }else{
        (await axios.post("http://192.168.0.119:3000/signup",Values)
        .then(alert("Your request send successfully!"))
        )
      }
   }else{
    alert("Password is not less than 8!")
   }}
    else{
      alert("You Should fill all the data!")
    }
    

  }catch(err){
    setErr(err.response.data)

  }

}


const pickImage = () => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      setImageUri(response.uri);
    }
  });
};
//console.log(err)


    return (
        
    <View style = {{flex:1,flexDirection:'column',justifyContent : 'flex-start',alignItems :'center',fontWeight:600,height:600}}>
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style = {styles.Container}>
    <Text style={styles.text}>SignUp Now</Text>
    <View style = {styles.inputStyle}>
    <MaterialIcons name="person" style={{color:'grey',fontSize:22, marginRight:10}}/>
    <TextInput placeholder='User ID                         '  keyboardType = 'numeric' onChangeText = {(text) => setValues({...Values,ID:text})}></TextInput>
    </View>
    <View style = {styles.inputStyle}>
    <MaterialIcons name="mail" style={{color:'grey',fontSize:22, marginRight:10}}/>
     <TextInput placeholder='Email' keyboardType='email-address' onChangeText = {(text) => setValues({...Values,Email:text})}></TextInput>
     </View>
     <View style = {styles.inputStyle}>
    <MaterialIcons name="face" style={{color:'grey',fontSize:22, marginRight:10}} />
     <TextInput placeholder='User Full Name' onChangeText = {(text) => setValues({...Values,Name:text})}></TextInput>
     </View>
     <View style = {styles.inputStyle}>
    <MaterialIcons name="lock" style={{color:'grey',fontSize:22, marginRight:10}} />
    <TextInput placeholder='Password'  secureTextEntry ={true} maxLength={18} onChangeText = {(text) => setValues({...Values,Password:text})}></TextInput>
    </View>
    <View style = {styles.inputStyle}>
    <MaterialIcons name="home" style={{color:'grey',fontSize:22, marginRight:10}} />
    <TextInput placeholder='City' onChangeText = {(text) => setValues({...Values,Location:text})}></TextInput>
    </View>
    
    <View style={{flexDirection:'row',width:310}}>
     <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
  <Text style={styles.appButtonText}>Register</Text>
</TouchableOpacity></View>
<Text style= {{ color: '#1B262C',fontSize:16}}>Already have an account? </Text>
  <TouchableOpacity onPress={Signin}><Text style= {{ color: '#3282B8',fontWeight:'900',fontSize:16}}>Sign In form here. </Text></TouchableOpacity>
  
</View>
</TouchableWithoutFeedback>
</View>
    );
  }

  const widthDevice = Math.round(Dimensions.get('window').width)
  const heightDevice = Math.round(Dimensions.get('window').height)

  const styles = StyleSheet.create({
  Container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'column',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor:'#FFF',
    marginTop:-40,
    width:widthDevice+40,
    elevation: 8,
    paddingTop:20,
    height:heightDevice -110


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
    marginBottom : 20,
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
    marginTop : 50,
    marginLeft : -20,
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

  /*
  <Button title='SignUp' onPress={handleSubmit} />
  <View style={{flexDirection:'row',width:310}}>
     <TouchableOpacity style={styles.appButtonContainer}>
  <Text style={styles.appButtonText} onPress={() => {
    console.log(userCity)
  }}>sign in</Text>
</TouchableOpacity></View>*/