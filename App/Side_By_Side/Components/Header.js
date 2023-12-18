import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Header(Props) {

  const navigation = useNavigation();
  const logOut = () => {
    navigation.navigate("home");
  };

  return (
    <View style={styles.Header}>
      <View style={styles.LeftContainer}>
        <Text style={styles.Font}>{Props.name}</Text>
      </View>
      <View style={styles.RightContainer}>
        <TouchableOpacity onPress={logOut}>
          <MaterialIcons name="logout" style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const widthDevice = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  Header: {
    width: widthDevice,
    backgroundColor: '#0F4C75',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  LeftContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft:15
  },
  RightContainer: {
    marginRight: 35,
    marginRight: 15
  },
  Font: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: '500',
  },
  Icon: {
    color: '#fff',
    fontSize: 26,
  },
});
