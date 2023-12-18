import React, { useState } from 'react';
import { TouchableOpacity,View, Text, StyleSheet,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

var iconHeight =26;
var iconWidth = 26;





export default function ReservedCard(props){
    //console.log(props.ID)
    //const [isActive, setIsActive] = useState(false);
   // console.log(isActive)
const handleDelete = (id) =>{
  console.log(id)
  //  setIsActive(current => !current);

  Alert.alert(
    'Confirmation',
    'Do you want to cancel this visit?',
    [
      {
        text: 'No',
        onPress: () => {
          // User clicked "No"
          console.log('You clicked No!');
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
         // setIsActive("Canceled!")
          color = true;
         // console.log(id)

axios.put('http://192.168.0.119:3000/delete/'+id)
.then(alert('The visit was canceled'))
.catch(err => console.log(err))
}
      }
    ])
  }
  return (
    <View style={styles.fullCard}>
    <View style={styles.container}>
      <View style={styles.date}>
      <Text style={styles.title}>{props.date}</Text>
      <Text style={styles.text}>{props.day}</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',width:100}}>
      <Text style={styles.Prison}>{props.Prison}</Text>
      </View>
    </View>
    <View style=
    {{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity style={styles.appButtonContainer }  onPress={()=>handleDelete(props.ID)}>
    <MaterialIcons name="delete" style={{color:'#0F4C75',fontSize:16,alignSelf: "center", marginRight:5}}/>

    <Text style={styles.appButtonText}>cancel</Text>
  </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullCard:{
    flexDirection:'column',
    shadowColor: '#000',
    width:380,
    height:130,
    marginBottom:20,
    marginTop:20,
    backgroundColor:'#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:'#DCDCDC',
    borderWidth:2,
    borderRadius:15

  },
  container: {
    flexDirection:'row',
    backgroundColor: '#fff',
    width:375,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent:'space-between',
    borderRadius:15
  },
  date:
  {
    flexDirection:'column'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  Cites:{
    fontSize: 14,
    fontWeight:'600',
    color:'#0F4C75',
    marginLeft:10,
    width:230

  },
  Prison:{
    fontSize: 14,
    fontWeight:'600',
    color:'#0F4C75',
    textAlign:'left'
  }
,appButtonContainer: {
  elevation: 8,
  backgroundColor: '#FFF',
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginBottom: 20,
  width :378,
  height : 47,
  marginTop : 0,
  marginLeft : 0,
  borderWidth:1,
  borderColor:'#FFF',
  borderTopColor:'#0F4C75',
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  borderBottomLeftRadius:15,
    borderBottomRightRadius:15


},
appButtonText: {
  fontSize: 18,
  color: "#0F4C75",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
});

