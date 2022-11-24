import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DataProvider } from './context/DataContext';

import Login from './pages/Login/'
import Home from './pages/Home/'
import HomeEditoras from './pages/HomeEditoras'
import HomeEditora from './pages/HomeEditora';
import HomeLivro from './pages/HomeLivro';
import Cart from './pages/Cart';
import Favorito from './pages/Favoritos';
import Pesquisa from './pages/Pesquisa';


import Ionicons from 'react-native-vector-icons/Ionicons';



const TabBottomNavigation = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{backgroundColor: '#99780C',paddingTop:5},
        tabBarActiveTintColor:'red',
        tabBarInactiveTintColor:'blue',
        
      }}
    >
      <TabBottomNavigation.Screen 
        name="Home" 
        component={Home}
        options={{
          title:'',
          tabBarIcon: ({focused})=> (<Ionicons name='home' color={focused?"#F4D05A":"#473b14"}  size={30}/>)
        }}
      />

      <TabBottomNavigation.Screen 
        name="Pesquisa" 
        component={Pesquisa}
        options={{
          title:'',
          tabBarIcon: ({focused})=> (<Ionicons name='search' color={focused?"#F4D05A":"#473b14"} size={30}/>)
        }}
      />

      <TabBottomNavigation.Screen 
        name="Favorito" 
        component={Favorito}
        options={{
          title:'',
          tabBarIcon: ({focused})=> (<Ionicons name='heart' color={focused?"#F4D05A":"#473b14"} size={30}/>)
        }}
      />

      <TabBottomNavigation.Screen 
        name="Cart" 
        component={Cart}
        options={{
          title:'',
          tabBarIcon: ({focused})=> (<Ionicons name='cart' color={focused?"#F4D05A":"#473b14"} size={30}/>)
        }}
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
              title: 'Livraria',
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

          <Stack.Screen
            name="HomeLivro" 
            component={HomeLivro} 
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#504e2e',
              },
            }}
          />

          <Stack.Screen
            name="HomeEditoras" 
            component={HomeEditoras} 
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#504e2e',
              },
            }}
          />
           <Stack.Screen
            name="Favorito" 
            component={Favorito} 
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
 