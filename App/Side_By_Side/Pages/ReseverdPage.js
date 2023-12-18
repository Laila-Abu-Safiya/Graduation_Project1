
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View,FlatList,Alert} from 'react-native';
import ReservedCard from '../Components/ReservedCard';
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
    const response = await fetch('http://192.168.0.119:3000/ReservedPage');
    const visites = await response.json();
    this.setState({data: visites});
    console.log(visites)
  }
componentDidMount(){
   this.fetchData();
  this.fetchInterval = this.fetchInterval = setInterval(this.fetchData, 5000);

}
  render() {
    return (<View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
    <Header name = "Reservation Visit" ></Header>
    
    <View style = {styles.Container}>
    
    <View style={styles.cardContainer}>
    <FlatList
       data={this.state.data}
       keyExtractor={(item,index) => index.toString()}
       renderItem={({item}) =>
          <ReservedCard date={formatDate(item.VisitDate)} day={item.Day}  Prison={item.Prison} ID={item.id}/>
        
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

},

})
