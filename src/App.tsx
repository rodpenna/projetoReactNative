

 import React,{useEffect, useState} from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Button
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './pages/Settings'
import Login from './pages/Login'
import Home from './pages/Home'

 const Tab = createBottomTabNavigator();
 const Stack = createNativeStackNavigator();

 const App = () => {
   


  return (
  <>
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>  */}
      
      <Tab.Navigator initialRouteName='Home'>

        <Tab.Screen 
          name="Home" 
          component={Home}
  
          options={{
            headerShown:false
          }}
                    
          />
        <Tab.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown:false
          }}
          />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            headerShown:false
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  </>
  );
 };
 
 
 
 export default App;
 