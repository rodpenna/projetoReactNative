import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DataContext, DataProvider } from './context/DataContext';

import Login from './pages/Login/'
// import Home from './pages/Home/'
import Home from './pages/Home/index2'
// import HomeEditoras from './pages/HomeEditoras'
import HomeEditoras from './pages/HomeEditoras'
import HomeEditora from './pages/HomeEditora';
// import HomeLivro from './pages/HomeLivro';
import HomeLivro from './pages/HomeLivro/index2';
import Cart from './pages/Cart/index2';
// import Cart from './pages/Cart';
import Favorito from './pages/Favoritos/index2';
// import Favorito from './pages/Favoritos';


import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData,clearStorage } from './services/LocalStorageService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from "react-native";


const TabBottomNavigation = createBottomTabNavigator();

const BottomNavigator = () => {
  LogBox.ignoreAllLogs();
  const {totalBadge,totalCarrinho} = useContext(DataContext)
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
        name="HomeEditoras" 
        component={HomeEditoras}
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
          tabBarIcon: ({focused})=> (<Ionicons name='heart' color={focused?"#F4D05A":"#473b14"} size={30}/>),
          tabBarBadge: totalBadge ? totalBadge : undefined

        }}
      />

      <TabBottomNavigation.Screen 
        name="Cart" 
        component={Cart}
        options={{
          title:'',
          tabBarIcon: ({focused})=> (<Ionicons name='cart' color={focused?"#F4D05A":"#473b14"} size={30}/>),
          tabBarBadge: totalCarrinho ? totalCarrinho : undefined
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
              title: 'Livros',
              headerStyle: {
                backgroundColor: '#504e2e',
              },
            }}
          />

          <Stack.Screen
            name="HomeLivro" 
            component={HomeLivro} 
            options={{
              title: 'Livro',
              headerStyle: {
                backgroundColor: '#504e2e',
              },
            }}
          />

          <Stack.Screen
            name="HomeEditoras" 
            component={HomeEditoras} 
            options={{
              title: 'Editoras',
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
 