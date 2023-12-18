import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';
import NavBar from '../Components/NavBar';
import ResetPassowrd from '../Pages/ResetPassword';
import SendEmail from '../Pages/SendEmail';
import PersonalChat from "../Pages/PersonalChat";

const widthDevice = Math.round(Dimensions.get('window').width)



const Stack = createNativeStackNavigator();
export default function MainRoute() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
        headerTintColor:'#FFF',headerStyle:{
          backgroundColor:'#3282B8',
          
        }

      }}>
      <Stack.Screen 
      name = 'Home'
      component={Home}
      options={{headerShown:false}}

      />
      <Stack.Screen 
      name = 'LOGIN'
      component={Login}
      options={{headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:22
      }}}
      />
      <Stack.Screen 
      name = 'SignUP'
      component={Signup}
      options={{headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:22
      }}}
      
      />
      <Stack.Screen 
      name = 'NewsPage'
      component={NavBar}
      options={{headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:22
      },
      headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'Reset Password'
      component={ResetPassowrd}
      options={{headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:22
      },
      headerShown:false}}
      
      />

    </Stack.Navigator>
  </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
