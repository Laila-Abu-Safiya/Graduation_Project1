import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const HeightDevice = Math.round(Dimensions.get('window').height)

export default function Home({navigation}) {
    return (
      
        <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center',backgroundColor:'white',height:HeightDevice}}>
      
        <View >
            <Text style={styles.Font}>Side By Side</Text>
            <Text style={styles.text}>This application works to 
alleviate the suffering of the Palestinian people in the registration process for visiting 
prisoners in the occupation prisons.</Text>
<View style={{marginTop:50}}>
<TouchableOpacity style={styles.appButtonContainer} onPress={(nav)=>navigation.navigate("LOGIN")}>
    <Text style={styles.appButtonText}>sign in</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.appButtonContainer} onPress={(nav)=>navigation.navigate("SignUP")}>
    <Text style={styles.appButtonText}> sign up</Text>
  </TouchableOpacity>
  
  </View>
        </View>
        </View>
    );
  }

  const widthDevice = Math.round(Dimensions.get('window').width)


  const styles = StyleSheet.create({
    Header: {
       width : widthDevice,
       backgroundColor: '#0F4C75',
       height: 350,
       justifyContent: 'center',
       alignItems:'center',
        borderBottomRightRadius : 200,
        borderBottomLeftRadius:20
    },
    Font: {
        color :'#BBE1FB',
        fontSize : 34,
        fontWeight: '500',
        alignSelf: 'center',
        shadowColor: "#3282B8",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
    },
    text:{
        width:350,
        textAlign:'center',
        color:'#1B262C'
    }
    ,appButtonContainer: {
        backgroundColor: '#3282B8',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        width :350,
        height : 50,
        shadowColor: "#000",
shadowOffset: {
	width: 2,
	height: 5,
},
shadowOpacity: 0.25,
shadowRadius: 4.5,

      
      },
      appButtonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
  })