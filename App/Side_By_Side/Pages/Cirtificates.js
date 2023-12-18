  import {ScrollView, Dimensions,Image, StyleSheet, Text, View,FlatList,TouchableOpacity,TextInput } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Header from '../Components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
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

export default function App() {
  let [name, setName] = useState("eg.Moh");
  let [Location, setLocation] = useState("eg.Nablus");
  let [ID, setID] = useState("eg.93836743");
  let [StartDate, setStartDate] = useState("eg.12-2-2022");
  let [EndDate, setEndDate] = useState("eg.12-2-2024");
  let [prisoner, setPrisoner] = useState("eg.Mohammad");
  let [visitDate, setVisitDate] = useState("eg.12-6-2023");
  let [prison, setPrison] = useState("eg.AL-Naqab");
  let [Info, setInfo] = useState();
  let [Info2, setInfo2] = useState();


  let [data1,setData] = useState([]);


  useEffect(() => {
    axios.get('http://192.168.0.119:3000/permit')
      .then(function (response) {
        setData(response.data);
        console.log(data1);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []); 

  useEffect(() => {
    const mappedData = data1.map(item => ({
      endDate: formatDate(item.EndDate),
      location: item.Location,
      name: item.Name,
      startDate: formatDate(item.StartDate),
      id: item.id,
      prison:item.Prison,
      visitdate:formatDate(item.VisitDate)
    }));


    if (mappedData.length > 0) {
      setEndDate(mappedData[0].endDate);
      setLocation(mappedData[0].location);
      setName(mappedData[0].name);
      setStartDate(mappedData[0].startDate);
      setID(mappedData[0].id);
      setVisitDate(mappedData[0].visitdate);
      setPrison(mappedData[0].prison);
    }
  }, [data1]);

  

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: `
      <html>
      <body>
      <div style="width: 100%;height:100%;bg-color:LightBlue; text-align: center;  display: flex;
      align-items: right;
      justify-content: center;align-item:center;flex-direction: column; border: thick double #32a1ce;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucFppeFyOq-l1G-h-JppFDc2d_L2TX6PJ7gcV_HoDgFt7PBZYAf8CQxpHmZZL_uHJn3I&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucFppeFyOq-l1G-h-JppFDc2d_L2TX6PJ7gcV_HoDgFt7PBZYAf8CQxpHmZZL_uHJn3I&usqp=CAU" alt="ICRC" width="300" height="300" style="align-self:center">    <h1>تصريح دخول إلى إسرائيل</h1>
      <h2>حامل الهوية: ${ID}</h2>
      <h2> ${name} :الشخص</h2>
      <h2> ${Location} :الساكن في</h2>
        <h2>سريان التصريح من: ${StartDate}</h2>
        <h2>سريان التصريح إلى: ${EndDate}</h2>
                <p style="color: Red;">يسمح له بالدخول الى مناطق الخط الأخضر لغرض الزيارة</p>
  
        </div>
      </body>
      </html>
    `,
      base64: false
    });

    await shareAsync(file.uri);
  };

  let generatePdf2 = async () => {
    const file = await printToFileAsync({
      html: `
      <html>
  <body>
  <div style="width: 100%;height:100%;bg-color:LightBlue; text-align: center;  display: flex;
  align-items: right;
  justify-content: center;align-item:center;flex-direction: column; border: thick double #32a1ce;">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucFppeFyOq-l1G-h-JppFDc2d_L2TX6PJ7gcV_HoDgFt7PBZYAf8CQxpHmZZL_uHJn3I&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucFppeFyOq-l1G-h-JppFDc2d_L2TX6PJ7gcV_HoDgFt7PBZYAf8CQxpHmZZL_uHJn3I&usqp=CAU" alt="ICRC" width="300" height="300" style="align-self:center"> 
     <h1>تصريح الزيارة</h1>
  <h1> ${ name} :الشخص</h1>
  <h1> ${Location} :الساكن في</h1>
    <h2>تاريخ الزيارة : ${visitDate}</h2>
    <h2> السجن: ${prison}</h2>

    </div>
  </body>
  </html>
    `,
      base64: false
    });

    await shareAsync(file.uri);
  };


  return (
    <ScrollView style ={{marginLeft: 0}}>
      <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
      <Header name = "Official Paper" ></Header>
      
      <View style = {styles.Container}>
      
      <View style={styles.cardContainer} >
      <Image source={require('../assets/images1.png')} style={{color:'#808080',height:200,alignSelf:'center'}}/>
          <Text style={styles.text}>Entry permit</Text>
        <TouchableOpacity style={styles.appButtonContainer} onPress={generatePdf}>
    <Text style={styles.appButtonText}>Download</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.cardContainer}>
  <Image source={require('../assets/images1.png')} style={{color:'#808080',height:200,alignSelf:'center'}}/>
          <Text style={styles.text}>Visit permit</Text>
        <TouchableOpacity style={styles.appButtonContainer} onPress={generatePdf2}>
    <Text style={styles.appButtonText}>Download</Text>
  </TouchableOpacity>
  </View>
        
      
        
    </View>
  </View></ScrollView>
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
  height: heightDevice ,


},
text:{
fontSize:20
,color:'#808080'
,fontWeight:'700',
alignSelf:'center'
},
cardContainer :{
paddingTop:-20,
marginTop:80,
  borderRadius:20,
  width:250,
  height:260,
  backgroundColor:'#FFF',
  elevation:8,
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4.5,

},
appButtonContainer: {
  elevation: 8,
  backgroundColor: '#0F4C75',
  borderBottomLeftRadius:20,
  borderBottomRightRadius:20,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginBottom: 20,
  width :250,
  height : 50,
  marginTop : 20,
  alignSelf:'flex-end'
  

},
appButtonText: {
  fontSize: 18,
  color: "#FFF",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
})