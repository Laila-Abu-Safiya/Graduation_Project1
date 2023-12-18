import Header from '../Components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import React,{ useState } from 'react';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function EmergUserForm() {
const navigation = useNavigation();

const [Values,setValues] = useState({
  Tittle:'',
  content:''
    })
  const [err, setErr]=useState(null);

  const handleSubmit =async e=>{
    e.preventDefault()
    console.log(Values)
    try{
      if(Values.Tittle != '' && Values.content != ''){
       
          (await axios.post("http://192.168.0.119:3000/EmergRed",Values)
          .then(alert("Your Message send successfully!"))
          )
        }
     
      else{
        alert("You Should fill all the data!")
      }
      
  
    }catch(err){
      setErr(err.response.data)
  
    }
  
  }

const GoTUserMsg = () => {
  navigation.navigate("Send Emergence To Red");
};


    return (
        <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
    <View style={styles.Header}>  
      <TouchableOpacity onPress={GoTUserMsg}>
      <MaterialIcons name='arrow-back' size={26} color='white' style={{marginLeft:20}}/>
      </TouchableOpacity>
       <Text style= {styles.Font}>Emergence Massege</Text>
      </View>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

    <View style = {styles.Container}>
    <View style={styles.cardContainer}>
    <Text style={styles.text}>Send Emegency Massage</Text>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="topic" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='Subject' onChangeText = {(text) => setValues({...Values,Tittle:text})}></TextInput>
      </View>
      <View style = {styles.inputStyle2}>
      <MaterialIcons name="toc" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput placeholder='Your Massege' style={{alignSelf:'flex-start',width:280}} multiline={true} onChangeText = {(text) => setValues({...Values,content:text})}></TextInput>
      </View>
    
  
      <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
    <Text style={styles.appButtonText}>Send</Text>
  </TouchableOpacity>

</View>
      
    </View>
    </TouchableWithoutFeedback>  
  
</View>
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
      height: heightDevice  ,
    
    
    },
    text:{
    fontSize:20
    ,color:'grey'
    ,fontWeight:'700',
    alignSelf:'center',
    marginBottom:20
    },
    cardContainer :{
    justifyContent:'center',
    alignItems:'center',
      borderRadius:100,
      width:widthDevice+40,
      height:heightDevice-100,
      backgroundColor:'#FFF',
      elevation:8,
    
    },
    inputStyle : {
        backgroundColor : '#FFF',
        height : 50,
        borderWidth : 1.5,
        borderColor : '#DCDCDC',
        borderRadius : 25,
        padding : 15,
        margin : 5,
        width:350,
        flexDirection:'row',
       },
       inputStyle2 : {
        backgroundColor : '#FFF',
        height : 200,
        borderWidth : 1.5,
        borderColor : '#DCDCDC',
        borderRadius : 25,
        padding : 15,
        margin : 5,
        width:350,
        flexDirection:'row',
       },
       appButtonContainer: {
        elevation: 8,
        backgroundColor: '#3282B8',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        width :350,
        height : 50,
        marginTop : 40,
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
      }, Header: {
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
