import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../constants';
import axios from 'axios';
import socketServices from './socketServices';

export default function App({ route }) {
  const [messages, setMessages] = useState([]);
  const { id } = route.params;
  const [data, setData] = useState({});
  const [user1Id, setUser1Id] = useState('');
  const [user2Id, setUser2Id] = useState('');

  const userColors = {
    [user1Id]: 'red',
    [user2Id]: 'blue',
  };

  console.log(id);
  const navigation = useNavigation();

  const GoToUserMsg = () => {
    navigation.navigate('Chat');
  };

  axios
    .get('http://192.168.0.119:3000/getLogin')
    .then(function (response) {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    socketServices.initializeSocket();

    // Clean up socket event listener
    return () => {
      socketServices.off('recived_msg');
    };
  }, []);

  useEffect(() => {
    socketServices.on('recived_msg', (message) => {
      const { text, userId } = message;

      const newMessage = {
        _id: Math.random().toString(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: userId,
          name: 'Ahmad',
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    });
  }, []);

  const onSend = (newMessages = []) => {
    const { text } = newMessages[0];

    if (text.trim().length > 0) {
      const user = {
        _id: id,
        name: 'John',
        avatar: 'https://example.com/avatar.jpg',
      };

      socketServices.emit('send_msg', { text, userId: id });
    }
  };

  const renderBubble = (props) => {
    const { currentMessage } = props;
    const bubbleStyle = currentMessage.user._id === user1Id ? styles.sentBubble : styles.receivedBubble;
    const bubbleTextStyle = currentMessage.user._id === user1Id ? styles.sentText : styles.receivedText;

    return (
      <View style={bubbleStyle}>
        <Bubble {...props} textStyle={bubbleTextStyle} />
      </View>
    );
  };

  const user = { _id: id };
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={GoToUserMsg}>
          <MaterialIcons name="arrow-back" size={26} color="white" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      </View>
      <Text style={{ ...FONTS.h3, marginLeft: 20, fontWeight: 600, color: '#fff' }}>Chat</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>{renderHeader()}</View>
      <GiftedChat
  messages={messages}
  onSend={onSend}
  user={user}
  renderBubble={renderBubble}
  userColors={userColors} // New prop to pass user colors
/>
    </View>
  );
}

const styles =
{
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems:'center',
                            width:500,
                            height:80,
                            backgroundColor:'#3282B8'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
    
  },
};