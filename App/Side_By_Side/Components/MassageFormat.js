import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';
const handleLike = (id) =>{
  console.log(id)
axios.put('http://192.168.0.119:3000/IncLikes/'+id)
.then(alert('The visit was canceled'))
.catch(err => console.log(err))
}
//../assets/news.png'
export default function MassageFormat(Props) {
    return (
      
      <View style={styles.cardContainer}>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
       <Text style = {styles.tittleStyle}>From: {Props.name}</Text>
       <Text style = {styles.tittleStyle}>To: {Props.to}</Text>
       <Text style = {styles.tittleStyle}>Subject: {Props.tittle}</Text>
       <Text style = {styles.dateStyle}>Date: {Props.date}</Text>
       <Text style = {styles.dateStyle}>{Props.content}</Text>
       </View>
       </View>
      </View>
     
    );
  }
  
  const widthDevice = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({
    cardContainer: {
       width : widthDevice - 70,
       backgroundColor: '#FFF',
       height: 300,
       borderRadius: 10,
       margin:20,
       elevation : 6,
       shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,


    },
    imageStyle: {
      height: 180,
      width : widthDevice - 70,
      borderRadius : 10,
    },
    tittleStyle :{
      fontSize: 16,
      fontWeight:'500',
      paddingLeft: 10,
      paddingTop : 10,
      width:widthDevice-100
    },
    dateStyle :{
      fontSize: 14,
      color:'#0F4C75',
      fontWeight:'500',
      paddingLeft: 10,
      paddingTop : 10,
      width:widthDevice-100
    },
    discriptionStyle : {
      fontSize: 14,
      paddingLeft: 10,
    }
  })