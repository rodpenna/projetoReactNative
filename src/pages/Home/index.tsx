import React from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button
  } from 'react-native';
  import Alerta from '../../components/Alert/Alerta'
  import AxiosInstance from '../../api/AxiosInstance';

  import NavBar from '../../components/Navigation/NavBar'

const Home = ({navigation}) => {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom:10 }}>Home Screen</Text>
            <View style={{ marginBottom:10, marginHorizontal:10 }}>
            <Button
              title="Go to Login"
              onPress={() => navigation.navigate('Login')}
            />
            </View>
            <View>
            <Button
              title="Go to Setting"
              onPress={() => navigation.navigate('Settings')}
            />
            </View>
        </View>
      );
}

export default Home;