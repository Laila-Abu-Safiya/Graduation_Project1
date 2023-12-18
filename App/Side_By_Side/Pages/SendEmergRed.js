
import React, {Component,useState} from 'react';
import {Dimensions, StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native';
import MassageFormat from '../Components/MassageFormat';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const formatDate = (inputDateString) => {
  // Create a new Date object from the input date string
  const inputDate = new Date(inputDateString);

  // Extract the day, month, and year from the input date
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  // Format the date string as "day-month-year"
  const outputDateString = `${day}-${month}-${year}`;

  // Return the formatted date string
  return outputDateString;
};

export default class App extends Component{

  handleButtonPress = () => {
    const { navigation } = this.props;
    navigation.navigate('Chat');
  };

  handleButtonPress2 = () => {
    const { navigation } = this.props;
    navigation.navigate('Emergence Red Massege');
  };

  state ={
    data:[]
  }
  
  fetchData= async()=>{
    const response = await fetch('http://192.168.0.119:3000/Message');
    const visites = await response.json();
    this.setState({data: visites});
    console.log(visites)
  }
componentDidMount(){
   this.fetchData();
   this.fetchInterval = this.fetchInterval = setInterval(this.fetchData, 5000);

}

  render() {
  
 /* const navigation = useNavigation();

  const GoTUserMsg = () => {
    navigation.navigate("Emergence Red Massege");
};

const Chat = () => {
  navigation.navigate("Chat");
};*/

    return (<View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
     <View style={styles.Header}>  
      <TouchableOpacity onPress={this.handleButtonPress}>
      <MaterialIcons name='arrow-back' size={26} color='white' style={{marginLeft:20}}/>
      </TouchableOpacity>
       <Text style= {styles.Font}>Emergence Massege</Text>
      </View>
    
    <View style = {styles.Container}>
    
    <View style={styles.cardContainer}>
   
          <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>
          <MassageFormat date={formatDate(item.Date)} name={item.fromID}  tittle={item.Tittle} to={item.ToID ===0 ? 'Red Cross' : item.T} content={item.Content}/>

       } />
      
        <View style={{flexDirection:'row',width:310}}>
     <TouchableOpacity style={styles.appButtonContainer} onPress={this.handleButtonPress2}>
  <Text style={styles.appButtonText}>Send New Massege</Text>
</TouchableOpacity></View> 
</View>

    
      
  </View>
</View>

  );
}
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
  height: heightDevice ,


},
text:{
fontSize:20
,color:'grey'
,fontWeight:'700',
alignSelf:'center'
},
cardContainer :{
justifyContent:'center',
alignItems:'center',
paddingTop:40,
  borderRadius:100,
  width:widthDevice+40,
  height:heightDevice-110,
  backgroundColor:'#FFF',
  elevation:8,

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
  marginTop : 20,
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
},
Header: {
  width : widthDevice,
  backgroundColor: '#0F4C75',
  height: 150,
  justifyContent: 'flex-start',
  alignItems:'center',
  flexDirection:'row',

},
Font: {
   color :'#FFF',
   fontSize : 34,
   fontWeight: '500',
   marginLeft:20
   
}
})
