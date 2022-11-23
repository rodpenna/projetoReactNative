import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../../pages/Login/Login2';
import SettingsScreen from '../../pages/Settings';
import Home from '../../pages/Home/Home2';



export default function NavBar() {
  const Tab = createBottomTabNavigator();
  return (
    
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
   
  );
}