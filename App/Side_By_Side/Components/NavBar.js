import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Chat from '../Pages/Chat';
import Cirtificates from '../Pages/Cirtificates';
import VisitPage from '../Pages/VisitPage';
import NewsPage from '../Pages/NewsPage';
import ReseverdPage from '../Pages/ReseverdPage';
import SendEmergUser from '../Pages/SendEmergUser';
import SendEmergRed from '../Pages/SendEmergRed';
import EmergUserForm from '../Pages/EmergUserForm';
import EmergeRedForm from '../Pages/EmergToRedForm';
import NewsDetails from '../Pages/NewsDetails';
import MyAvailableVisit from '../Pages/MyAvailableVisit';
import PersonalChat from '../Pages/PersonalChat';
import Home from '../Pages/Home';


const Stack = createNativeStackNavigator();

const homeName = 'Home';
const chatName = 'Chat';
const visitName = 'Visit';
const reserveName = 'Reserve';
const certificateName = 'Cirtificates';
const latestUpdate = 'Updates';


const Tab = createBottomTabNavigator();



function MainNav(){
return(
  <Tab.Navigator
  initialRouteName= {homeName} 
  screenOptions={({route}) => ({
    tabBarInactiveTintColor :'grey',
    tabBarActiveTintColor:'#0F4C75',
    tabBarStyle:{
      padding: 10,height:70,paddingBottom:10,elevation:20,backgroundColor:'#FFF',borderRadius:30,margin:20,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.5,
    },
    headerShown:false,
    tabBarIcon : ({fouced,color,size}) => {
      let iconName;
      let rn = route.name;

      if(rn === homeName){
        iconName = 'home';

      }else if(rn === chatName){
        iconName = 'chat';
    }
    else if(rn === visitName){
      iconName ='menu';
  }
  else if(rn === reserveName){
    iconName ='done';
}
else if(rn === certificateName){
  iconName ='approval';
}
else if(rn === latestUpdate){
  iconName ='lightbulb';
}
return(
<MaterialIcons name={iconName} size={26} color={color} />
);
}, 
  })}
  
 

  >

    <Tab.Screen name={chatName} component={Chat}/>
    <Tab.Screen name={visitName} component={VisitPage}/>
    <Tab.Screen name={homeName} component={NewsPage}/>
    <Tab.Screen name={latestUpdate} component={NewsDetails}/>
    <Tab.Screen name={reserveName} component={ReseverdPage}/>
    <Tab.Screen name={certificateName} component={Cirtificates}/>

   
  </Tab.Navigator>
)
}

function MainNav2(){
  return(
    <Tab.Navigator
    initialRouteName= {visitName} 
    screenOptions={({route}) => ({
      tabBarInactiveTintColor :'grey',
      tabBarActiveTintColor:'#0F4C75',
      tabBarStyle:{
        padding: 10,height:70,paddingBottom:10,elevation:20,backgroundColor:'#FFF',borderRadius:30,margin:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
      },
      headerShown:false,
      tabBarIcon : ({fouced,color,size}) => {
        let iconName;
        let rn = route.name;
  
        if(rn === homeName){
          iconName = 'home';
  
        }else if(rn === chatName){
          iconName = 'chat';
      }
      else if(rn === visitName){
        iconName ='menu';
    }
    else if(rn === reserveName){
      iconName ='done';
  }
  else if(rn === certificateName){
    iconName ='approval';
  }
  else if(rn === latestUpdate){
    iconName ='lightbulb';
  }
  return(
  <MaterialIcons name={iconName} size={26} color={color} />
  );
  }, 
    })}
    
   
  
    >
  
      <Tab.Screen name={chatName} component={Chat}/>
      <Tab.Screen name={visitName} component={VisitPage}/>
      <Tab.Screen name={homeName} component={NewsPage}/>
      <Tab.Screen name={latestUpdate} component={NewsDetails}/>
      <Tab.Screen name={reserveName} component={ReseverdPage}/>
      <Tab.Screen name={certificateName} component={Cirtificates}/>
  
     
    </Tab.Navigator>
  )
  }

  function MainNav3(){
    return(
      <Tab.Navigator
      initialRouteName= {chatName} 
      screenOptions={({route}) => ({
        tabBarInactiveTintColor :'grey',
        tabBarActiveTintColor:'#0F4C75',
        tabBarStyle:{
          padding: 10,height:70,paddingBottom:10,elevation:20,backgroundColor:'#FFF',borderRadius:30,margin:20,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2.5,
        },
        headerShown:false,
        tabBarIcon : ({fouced,color,size}) => {
          let iconName;
          let rn = route.name;
    
          if(rn === homeName){
            iconName = 'home';
    
          }else if(rn === chatName){
            iconName = 'chat';
        }
        else if(rn === visitName){
          iconName ='menu';
      }
      else if(rn === reserveName){
        iconName ='done';
    }
    else if(rn === certificateName){
      iconName ='approval';
    }
    else if(rn === latestUpdate){
      iconName ='lightbulb';
    }
    return(
    <MaterialIcons name={iconName} size={26} color={color} />
    );
    }, 
      })}
      
     
    
      >
    
        <Tab.Screen name={chatName} component={Chat}/>
        <Tab.Screen name={visitName} component={VisitPage}/>
        <Tab.Screen name={homeName} component={NewsPage}/>
        <Tab.Screen name={latestUpdate} component={NewsDetails}/>
        <Tab.Screen name={reserveName} component={ReseverdPage}/>
        <Tab.Screen name={certificateName} component={Cirtificates}/>
    
       
      </Tab.Navigator>
    )
    }


    function MainNav4(){
      return(
        <Tab.Navigator
        initialRouteName= {MyAvailableVisit} 
        screenOptions={({route}) => ({
          tabBarInactiveTintColor :'grey',
          tabBarActiveTintColor:'#0F4C75',
          tabBarStyle:{
            padding: 10,height:70,paddingBottom:10,elevation:20,backgroundColor:'#FFF',borderRadius:30,margin:20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2.5,
          },
          headerShown:false,
          tabBarIcon : ({fouced,color,size}) => {
            let iconName;
            let rn = route.name;
      
            if(rn === homeName){
              iconName = 'home';
      
            }else if(rn === chatName){
              iconName = 'chat';
          }
          else if(rn === visitName){
            iconName ='menu';
        }
        else if(rn === reserveName){
          iconName ='done';
      }
      else if(rn === certificateName){
        iconName ='approval';
      }
      else if(rn === latestUpdate){
        iconName ='lightbulb';
      }
      return(
      <MaterialIcons name={iconName} size={26} color={color} />
      );
      }, 
        })}
        
       
      
        >
      
          <Tab.Screen name={chatName} component={Chat}/>
          <Tab.Screen name={visitName} component={MyAvailableVisit}/>
          <Tab.Screen name={homeName} component={NewsPage}/>
          <Tab.Screen name={latestUpdate} component={NewsDetails}/>
          <Tab.Screen name={reserveName} component={ReseverdPage}/>
          <Tab.Screen name={certificateName} component={Cirtificates}/>
      
         
        </Tab.Navigator>
      )
      }
  

export default function NavBar() {
  return(
    <Stack.Navigator screenOptions={{
        headerTintColor:'#FFF',headerStyle:{
          backgroundColor:'#3282B8',
          
        }

      }}>
      <Stack.Screen 
      name = 'News Page'
      component={MainNav}
      options={{headerShown:false}}

      />
      <Stack.Screen 
      name = 'Chat'
      component={MainNav3}
      options={{headerShown:false
      }}
      />
      <Stack.Screen 
      name = 'Send Emergence To User'
      component={SendEmergUser}
      options={{headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'Send Emergence To Red'
      component={SendEmergRed}
      options={{headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'Emergence User Massege'
      component={EmergUserForm}
      options={{headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'Emergence Red Massege'
      component={EmergeRedForm}
      options={{headerShown:false}}
      
      />
       
       <Stack.Screen 
      name = 'NewsDetails'
      component={NewsDetails}
      options={{headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'MyVisits'
      component={MainNav4}
      options={{headerShown:false}}
      
      />
      <Stack.Screen 
      name = 'All Visits'
      component={MainNav2}
      options={{headerShown:false}}
      
      />
       <Stack.Screen 
      name = 'PersonalChat'
      component={PersonalChat}
      options={{headerShown:false}}
      
      />
       <Stack.Screen 
      name = 'home'
      component={Home}
      options={{headerShown:false}}
      
      />

    </Stack.Navigator>
  );
}
