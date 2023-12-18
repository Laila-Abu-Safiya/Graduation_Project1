import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';



//../assets/news.png'
export default function NewsCard(Props) {
  const url = Props.img;
      console.log((Props.img))

      const handleLike = (id) =>{
        console.log(id)
         axios.post('http://192.168.0.119:3000/IncLikes/'+id)
     
      .catch(err => console.log(err))
      }
    return (
      
      <View style={styles.cardContainer}>
      <Image source={{url}} style={styles.imageStyle} />
       <TouchableOpacity>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'column'}}>
       <Text style = {styles.dateStyle}>{Props.Date}</Text>
       <Text style = {styles.tittleStyle}>{Props.text}</Text>
       </View>
       <TouchableOpacity onPress={()=>handleLike(Props.ID)}>
       <MaterialIcons name="recommend" style={{color:'#0F4C75',fontSize:26, marginRight:35, marginTop:10}}/>
       <Text style={{marginLeft:5}}>{Props.numberLikes}</Text>
       </TouchableOpacity>
       </View>
       </TouchableOpacity>
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
  ///<Image source={{ uri: url }} style={styles.imageStyle} />