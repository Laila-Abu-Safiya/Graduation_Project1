import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';


export default function ChatCard(Props) {
  url=Props.img
  console.log((Props.Name))
    return (
      <View style={styles.cardContainer}>
       <Image source={require('../assets/NewsImg.png')} style = {styles.imageStyle} />
       <TouchableOpacity>
       <View >
       <Text style = {styles.tittleStyle}>{Props.Name}</Text>
       <Text style={{marginLeft:10}}>{Props.City}</Text>
       
       </View>
       </TouchableOpacity>
      </View>
     
    );
  }
  
  const widthDevice = Math.round(Dimensions.get('window').width)

  const styles = StyleSheet.create({
    cardContainer: {
       width : widthDevice,
       backgroundColor: '#FFF',
       height: 80,
    flexDirection:'row',
    paddingTop:5,
    borderColor:'#FFF',
    borderBottomColor:'#D3D3D3',
      borderWidth:1

    },
    imageStyle: {
      height: 70,
      width : 70,
      borderRadius : 70,
      
    },
    tittleStyle :{
      marginTop:10,
      fontSize: 16,
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