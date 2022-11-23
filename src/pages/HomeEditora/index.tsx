import React from 'react';

import {
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeEditora = ({route,navigation}) => {

  const {id} = route.params
  
  return (
    <View>
      <Text>Home Editora</Text>
      <Text>{id}</Text>
      <Text>Texto</Text>
    </View>
  )
}

export default HomeEditora;