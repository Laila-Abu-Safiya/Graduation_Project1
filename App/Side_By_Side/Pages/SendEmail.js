/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import * as MailComposer from 'expo-mail-composer';
import * as Print from 'expo-print';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Components/Header';
// expo add expo-print expo-mail-composer

export default function App() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState(undefined);
  const [body, setBody] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }

    checkAvailability();
  }, []);

  const sendMail = async () => {
    const { uri } = await Print.printToFileAsync({
      html: "<h1>My pdf!</h1>"
    });

    MailComposer.composeAsync({
      subject: subject,
      body: body,
      recipients: recipients,
      attachments: [uri]
    });
  };

  const addRecipient = () => {
    let newRecipients = [...recipients];
    newRecipients.push(email);

    setRecipients(newRecipients);
    setEmail(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text>No recipients added</Text>;
    }

    return recipients.map((recipient, index) => {
      return <Text key={index}>{recipient}</Text>;
    });
  };

  return (
    <View style = {{flexDirection:'column',justifyContent : 'center',alignItems :'center'}}>
    <Header name = "Send Email" ></Header>
    
    <View style = {styles.Container}>
    
    <View style={styles.cardContainer}>
    <Text style={styles.text}>Send Email</Text>
    <View style = {styles.inputStyle}>
      <MaterialIcons name="attach-file" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput value={subject} onChangeText={setSubject} placeholder="Subject"></TextInput>
      </View>
    <View style = {styles.inputStyle}>
      <MaterialIcons name="menu-open" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput value={body} onChangeText={setBody} placeholder="Body"></TextInput>
      </View>
      <View style = {styles.inputStyle}>
      <MaterialIcons name="email" style={{color:'grey',fontSize:22, marginRight:10}}/>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email"></TextInput>
      </View>
      <Button title='Add Recipient' onPress={addRecipient} style={styles.appButtonContainer}/>
      {showRecipients()}
      {isAvailable ? <Button title='Send Mail' onPress={sendMail} /> : <Text>Email not available</Text>}

</View>
      
    
      
  </View>
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
      }
    
    })*/
/* <TextInput value={subject} onChangeText={setSubject} placeholder="Subject" />
      <TextInput value={body} onChangeText={setBody} placeholder="Body" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <Button title='Add Recipient' onPress={addRecipient} />
      {showRecipients()}
      {isAvailable ? <Button title='Send Mail' onPress={sendMail} /> : <Text>Email not available</Text>}
      <StatusBar style="auto" />*/