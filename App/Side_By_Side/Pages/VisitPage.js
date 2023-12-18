import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native';
import VisitsSchedule from '../Components/VisitsSchedule'
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import axios from 'axios';

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


 export default class App extends Component {
  
 
  state ={
    data:[]
  }
  
  fetchData= async()=>{
    const response = await fetch('http://192.168.0.119:3000/AvailbleVistes');
    const visites = await response.json();
    this.setState({data: visites});
    console.log(visites)
  }
componentDidMount(){
   this.fetchData();
   this.fetchInterval = this.fetchInterval = setInterval(this.fetchData, 5000);

  
}

handleButtonPress = () => {
  const { navigation } = this.props;
  navigation.navigate('MyVisits');
};


  render() {
    return (<View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
    <Header name = "Visits" ></Header>
    
    <View style = {styles.Container}>
    
    <View style={styles.cardContainer}>
      <View style={{flexDirection:'row'}}> 
      <View style={{width:310}}>
     <TouchableOpacity style={styles.appButtonContainer1}>
  <Text style={styles.appButtonText}>All Visites</Text>
</TouchableOpacity></View>
<View style={{width:310}}>
     <TouchableOpacity style={styles.appButtonContainer2} >
  <Text style={styles.appButtonText2} onPress={this.handleButtonPress}>My Visites</Text>
</TouchableOpacity></View>
      </View>
    <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>
       
          <VisitsSchedule date={formatDate(item.VisitDate)} day={item.Day}  Prison={item.Prison} ID={item.id}/>
        
       } />
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
  height:heightDevice,
  backgroundColor:'#FFF',
  elevation:8,

}
,appButtonContainer1: {
  elevation: 8,
  backgroundColor: '#3282B8',
  borderTopLeftRadius:20,
  borderBottomLeftRadius:20,
  width :105,
  height : 55,
  shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.5,
    marginTop:7,
        marginLeft:205

},
appButtonContainer2: {
  elevation: 8,
  backgroundColor: '#fff',
  borderTopRightRadius:20,
  borderBottomRightRadius:20,
  width :105,
  height : 50,
  marginTop : 10,
  shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.5,

},
appButtonText: {
  fontSize: 14,
  color: "#FFF",
  alignSelf: "center",
  textTransform: "uppercase",
  marginTop:17
},
appButtonText2: {
  fontSize: 14,
  color: "#3282B8",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase",
  marginTop:15
}

})
