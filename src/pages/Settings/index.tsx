import React ,{useDebugValue, useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

  
function SettingsScreen({navigation}) {
    return (
      <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
      </>
    );
  }

  export default SettingsScreen