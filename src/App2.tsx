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

import { DataProvider } from './context/DataContext';

import Login from './pages/Login/Login2'
import Home from './pages/Home/Home2'
import HomeEditoras from './pages/HomeEditoras'
import HomeEditora from './pages/HomeEditora';

import Ionicons from 'react-native-vector-icons/Ionicons';




const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#ffcc00'},
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'blue'
      }}
    >
      <TabBottomNavigation.Screen name="Home" component={Home}
        options={{
          title:'Home',
          tabBarIcon: ()=> (<Ionicons name='home' color='#000' size={24}/>)
        }}
        />

      <TabBottomNavigation.Screen name="HomeEditoras" component={HomeEditoras}/>

    </TabBottomNavigation.Navigator>
  )
}


const Stack = createNativeStackNavigator();
const App = () => {
  
  return (
  <>
  <DataProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#190152',
            },            
          }}
        />

        <Stack.Screen
          name="BottomNavigator" 
          component={BottomNavigator} 
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#190152',
            },
          }}
        />

        <Stack.Screen
          name="HomeEditora" 
          component={HomeEditora} 
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#190152',
            },
          }}
        />

      </Stack.Navigator> 
    </NavigationContainer>
  </DataProvider>
  </>
  );
};

 
 
 export default App;
 