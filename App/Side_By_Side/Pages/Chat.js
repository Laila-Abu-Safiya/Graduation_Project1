import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../Components/PageContainer'
import { COLORS, FONTS } from '../constants'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { contacts } from '../constants/data'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const Contacts = () => {
    
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(contacts)
    const navigation = useNavigation();

    const [data,setData] = useState({})

    useEffect(() => {
        const fetchData = () => {
          axios
            .get('http://192.168.0.119:3000/users')
            .then(function (response) {
              setData(response.data);
              setFilteredUsers(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        };
      
        // Fetch data initially
        fetchData();
      
        // Set interval to refresh data every 5 minutes (adjust the interval as needed)
        const interval = setInterval(fetchData, 5 * 60 * 1000);
      
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, []);
      
    const GoToUserMsg = () => {
        navigation.navigate("Send Emergence To User");
      };
    
    const GoToRedMsg = () => {
        navigation.navigate("Send Emergence To Red");
    };

    const handleSearch = (text) => {
        setSearch(text)
        const filteredData = contacts.filter((user) =>
            user.userName.toLowerCase().includes(text.toLowerCase())
        )
        setFilteredUsers(filteredData)
    }
    
   
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            
            onPress={() =>
                
                navigation.navigate('PersonalChat', { id:  data[index]?.ID})
            }
            style={[
                {
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 22,
                    borderBottomColor: COLORS.secondaryWhite,
                    borderBottomWidth: 1,
                },
                index % 2 !== 0
                    ? {
                          backgroundColor: COLORS.tertiaryWhite,
                      }
                    : null,
            ]}
        >
            <View
                style={{
                    paddingVertical: 15,
                    marginRight: 22,
                }}
            >
                

                <Image
                    source={require('../assets/user.png')}
                    resizeMode="contain"
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                <Text style={{ ...FONTS.h4, marginBottom: 4 }}>
                {data[index]?.Name}
                </Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 22,
                            marginTop: 22,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Contacts</Text>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={GoToUserMsg}  
                        >
                            <MaterialIcons name='notifications' size={26} color='#000' style={{marginRight:20,}} />
                           
                        </TouchableOpacity>
                        <TouchableOpacity onPress={GoToRedMsg}
                        >
                            <MaterialIcons name='campaign' size={26} color='#000' />
                        </TouchableOpacity></View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondaryWhite,
                            height: 48,
                            marginVertical: 22,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                        }}
                    >
                        <Ionicons
                            name="ios-search-outline"
                            size={24}
                            color={COLORS.black}
                        />

                        <TextInput
                            style={{
                                width: '100%',
                                height: '100%',
                                marginHorizontal: 12,
                            }}
                            value={search}
                            onChangeText={handleSearch}
                            placeholder="Search contact..."
                        />
                    </View>

                    <View
                        style={{
                            paddingBottom: 100,
                        }}
                    >
                        <FlatList
                            data={filteredUsers}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.ID.toString()}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Contacts;


  

  