import React, { useState } from 'react';
import { TouchableOpacity,View, Text, StyleSheet,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

var iconHeight =26;
var iconWidth = 26;
var color = false;
const VisitsSchedule = (props) => {
  const [isActive, setIsActive] = useState('reserve');
  //const [color, setColor] = useState(false);

  const handleReserve = (id) =>{
    Alert.alert(
      'Confirmation',
      'Do you want to proceed?',
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
            setIsActive("Reserved!")
            color = true;
           // console.log(id)
        axios.put('http://192.168.0.119:3000/ReserveVisit/'+id)
        .then(response => {
          // Handle the response here
          const result = response.data; // Assuming the result is in the 'data' property of the response
          // Pass the result to the front end or perform any necessary actions
          console.log(result);
          alert('The visit was reserve')
        })
        //.then(alert('The visit was reserve'))
        .catch(err => alert('You cannot reserve in this visit.'))
          },
        },
      ],
      { cancelable: false }
    );

   
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
    <TouchableOpacity style={{ elevation: 8,
  //backgroundColor: '#FFF',
  backgroundColor: color ? '#F0F8FF' : '',
  color: color ? 'white' : '',
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginBottom: 20,
  width :378,
  height : 51,
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
}} onPress={()=>handleReserve(props.ID)}>


    <MaterialIcons name="bookmark" style={{color:'#0F4C75',fontSize:16,alignSelf: "center", marginRight:5}}/>

    <Text style={styles.appButtonText}>{isActive}</Text>
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
,
appButtonText: {
  fontSize: 18,
  color: "#0F4C75",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
});

export default VisitsSchedule;
