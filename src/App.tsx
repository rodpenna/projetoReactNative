import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DataProvider } from './context/DataContext';

import Login from './pages/Login/'
import Home from './pages/Home/'
import HomeEditoras from './pages/HomeEditoras'
import HomeEditora from './pages/HomeEditora';

import Ionicons from 'react-native-vector-icons/Ionicons';



const TabBottomNavigation = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#99780C'},
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'blue'
      }}
    >
      <TabBottomNavigation.Screen 
        name="Home" 
        component={Home}
        options={{
          title:'Home',
          tabBarIcon: ()=> (<Ionicons name='home' color='#000' size={24}/>)
        }}
      />

      <TabBottomNavigation.Screen 
        name="HomeEditoras" 
        component={HomeEditoras}
      />

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
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#504e2e',
              },            
            }}
          />
          <Stack.Screen
            name="BottomNavigator" 
            component={BottomNavigator} 
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#504e2e',
              },
            }}
          />
          <Stack.Screen
            name="HomeEditora" 
            component={HomeEditora} 
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#504e2e',
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
 