import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ImageBackground,Dimensions,ScrollView, StyleSheet, Text, View,Button } from 'react-native';
import React, {useState,useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const image = {uri: 'C:/Users/dell/Apps/Software_Project/assets/NewsImg.png'};

const widthDevice = Math.round(Dimensions.get('window').width)
const heightDevice = Math.round(Dimensions.get('window').height)


export default function NewsDetails() {

  let [data1,setData] = useState([]);
  let[prison,setPrison]= useState();
  let[num,setNum]= useState();
  let[admins,setAdmins]= useState();
  let[childs,setChilds]= useState();
  let[girl,setGirl]= useState();
  let[life,setLife]= useState();
  let[M1,setM1]= useState();
  let[M2,setM2]= useState();
  let[M3,setM3]= useState();
  let[M4,setM4]= useState();

  useEffect(() => {
    axios.get('http://192.168.0.119:3000/info')
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
      Prison: item.Prisone,
      number: item.NumberOfPrisoners,
      admin: item.AdministrativeDetainees,
      child: item.Child,
      Women: item.women,
      all:item.AllLife,
      m1:item.first_military,
      m2:item.milarity2,
      m3:item.milarity3,
      m4:item.milarity4
    }));


    if (mappedData.length > 0) {
      setPrison(mappedData[0].Prison);
      setNum(mappedData[0].number);
      setAdmins(mappedData[0].admin);
      setGirl(mappedData[0].Women);
      setChilds(mappedData[0].child);
      setLife(mappedData[0].all);
      setM1(mappedData[0].m1);
      setM2(mappedData[0].m2);
      setM3(mappedData[0].m3);
      setM4(mappedData[0].m4);
    }
  }, [data1]);


  const navigation = useNavigation();

  const GoToNews = () => {
    navigation.navigate("NewsPage");
  };

  const [mapRegion,setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421 
 })

 const userLocation = async () => {
     let { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
         console.log('Premisoon was not denied');
     }
     let location = await Location.getCurrentPositionAsync({});
     setMapRegion({
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
     });
     console.log(location.coords.latitude,location.coords.longitude);
 }

 useEffect(() =>{
     userLocation()
 }, [])

 

  return (
    <View style={styles.container}>
      <ScrollView style={{height:heightDevice, width:widthDevice}}>
    <View style={styles.Header}> 
    <MapView style={styles.map} 
      region={mapRegion}
      > 
      <Marker coordinate={mapRegion} title='Marker'/>
      </MapView>
    <Button title='getLocation' onPress={userLocation}/>
     </View>
     
     <View style={styles.ContentStyle}>
     
      <View style={{flexDirection:'row',marginTop:20}}>
      <Text style ={{fontSize:20,fontWeight:'500',height:40,color:'#3282B8',width:350}}>Learn About</Text>
      </View>
      <ScrollView>
        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Prisons:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {prison}</Text>
        </View>
        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Number Of Prisoners:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {num}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Administrative Detainees:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {admins}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Number of Children prisoners:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {childs}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Number of Women prisoners:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {girl}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Prisoners For whole life</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {life}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>The first military court:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {M1}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Military Court of Appeal:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {M2}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>Military courts that decide on arrest procedures during the investigation phase:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {M3}</Text>
        </View>

        <View style={{backgroundColor:'#BBE1FA', borderWidth:1,borderColor:'#0F4C75',borderRadius:10,width:widthDevice-50,marginBottom:20}}>
          <Text style ={{alignSelf: 'flex-start',marginTop:20,marginLeft:10,fontSize:22,marginBottom:5,color:'#1B262C'}}>The military court that decides on administrative detention:</Text>
        <Text style ={{alignSelf: 'flex-start',marginLeft:30,marginBottom:10,fontSize:18,color:'#0F4C75'}}> {M4}</Text>
        </View>
        
      </ScrollView>
     </View>
     </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  Header: {
     width : widthDevice,
     backgroundColor: '#0F4C75',
     height: 700,
     justifyContent: 'center',
     alignItems:'center',

  },
  Font: {
      color :'#FFF',
      fontSize : 34,
      fontWeight: '600',
      alignSelf : 'center',
      marginTop : -100

      
  },image: {
    flex: 1,
    justifyContent: 'center',
    width : widthDevice,
    
  },
  ContentStyle 
  :{
    backgroundColor : '#FFF',
    width:widthDevice+20,
    height : 1500,
    marginTop : -35,
    borderTopLeftRadius : 50,
    borderTopRightRadius : 50,
    justifyContent : 'flex-start',
    alignItems :'center',
    paddingTop : 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
    marginLeft:-10
    
   
  } , map: {
    width: '100%',
    height: '100%',
  },
  
})