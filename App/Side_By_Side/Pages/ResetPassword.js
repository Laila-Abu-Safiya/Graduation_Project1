import Header from '../Components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import React,{ useState } from 'react';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function ResetPassowrd() {
 const [ID,setID]=useState('');
const [Password,setPassowrd]= useState('');
const [NewPassword,setNewPassword]= useState('');
const navigation = useNavigation();

const Signin = () => {
  navigation.navigate("LOGIN");
};

const handleSubmit =async e=>{
  e.preventDefault()
 // console.log(Object.values(Password))
  //console.log(Object.values(NewPassword))
  //console.log(Object.values(Password)[0] == Object.values(NewPassword)[0])
  try{
    if(ID != '' && Password != '' && NewPassword!=''){
        console.log(Object.values(Password)[0])
        console.log(ID)
        const pass = Object.values(Password)[0];
        if(Object.values(Password)[0] === Object.values(NewPassword)[0]){
    (await axios.put("http://192.168.0.119:3000/ResetPassowrd",{ID,Password})
    .then(alert("Your password reset correctly"))

    )}else{
        alert("NewPassword are not the same ")
    }
}
    else{
      alert("You Should fill all the data!")
    }
    

  }catch(err){
    console.log(err)

  }

}
    return (
        <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
    <View style={styles.Header}>  
       <Text style= {styles.Font}>Reset Password</Text>
      </View>
    <View style = {styles.Container}>
    
    <View style={styles.cardContainer}>
    <Text style={styles.text}>Reset Your Passowrd</Text>
    <View style = {styles.inputStyle}>
      <MaterialIcons name="person" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='User ID                         '  keyboardType = 'numeric' onChangeText = {(text) => setID({...ID,ID:text})}></TextInput>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="lock" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='New Password'  secureTextEntry ={true} maxLength={18} onChangeText = {(text) => setPassowrd({...Password,Password:text})}></TextInput>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="lock" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='Repeat Password'  secureTextEntry ={true} maxLength={18} onChangeText = {(text) => setNewPassword({...NewPassword,NewPassword:text})}></TextInput>
      </View>
      <Text style= {{ color: '#1B262C',fontSize:16}}>Already have an account? </Text>
  <TouchableOpacity onPress={Signin}><Text style= {{ color: '#3282B8',fontWeight:'900',fontSize:16}}>Sign In form here. </Text></TouchableOpacity>
  
      <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
    <Text style={styles.appButtonText}>Reset Passowrd</Text>
  </TouchableOpacity>

</View>
      
    
      
  </View>
</View>
    );
  }

  const widthDevice = Math.round(Dimensions.get('window').width)
  const heightDevice = Math.round(Dimensions.get('window').height)
  const styles = StyleSheet.create({
    Container : {
      flex : 1,
      justifyContent : 'flex-start',
      alignItems : 'center',
      flexDirection : 'column',
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      backgroundColor:'#fff',
      marginTop:-40,
      width:widthDevice+40,
      height: heightDevice  ,
    
    
    },
    text:{
    fontSize:20
    ,color:'grey'
    ,fontWeight:'700',
    alignSelf:'center',
    marginBottom:20
    },
    cardContainer :{
    justifyContent:'center',
    alignItems:'center',
      borderRadius:100,
      width:widthDevice+40,
      height:heightDevice-100,
      backgroundColor:'#FFF',
      elevation:8,
    
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
       appButtonContainer: {
        elevation: 8,
        backgroundColor: '#3282B8',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        width :350,
        height : 50,
        marginTop : 40,
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
      },
      Header: {
        width : widthDevice,
        backgroundColor: '#0F4C75',
        height: 150,
        justifyContent: 'center',
        alignItems:'center',
 
     },
     Font: {
         color :'#FFF',
         fontSize : 34,
         fontWeight: '500',
         
     }
    
    })

  /*
  <View style = {{flexDirection:'column',justifyContent : 'flex-start',alignItems :'center'}}>
    <Header name = "Reset" ></Header>
    <View style = {styles.Container}>
    <Text style={styles.text}>Reset Your Password</Text>
    <View style = {styles.inputStyle}>
    <MaterialIcons name="mail" style={{color:'grey',fontSize:22, marginRight:10}}/>
     <TextInput placeholder='Email'  keyboardType='email-address'></TextInput>
     </View>
     <View style = {styles.inputStyle}>
    <MaterialIcons name="lock" style={{color:'grey',fontSize:22, marginRight:10}}/>
    <TextInput placeholder='New Password' secureTextEntry ={true}></TextInput>
    </View>
    <View style = {styles.inputStyle}>
    <MaterialIcons name="mail" style={{color:'grey',fontSize:22, marginRight:10}}/>
    <TextInput placeholder='New Password' secureTextEntry ={true}></TextInput>
    </View>
      <View style={{flexDirection:'row',width:310}}>
     <TouchableOpacity style={styles.appButtonContainer}>
  <Text style={styles.appButtonText}>Reset Passowrd</Text>
</TouchableOpacity></View>
</View>
</View>*/