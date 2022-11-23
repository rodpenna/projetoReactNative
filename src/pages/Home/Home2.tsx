import React,{useContext, useEffect, useState} from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';
import Alerta from '../../components/Alert/Alerta'
import AxiosInstance from '../../api/AxiosInstance';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../Login';
import SettingsScreen from '../Settings';
import NavBar from '../../components/Navigation/NavBar';

import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';




const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);



const Home = ({navigation}) => {

 
  const {dadosUsuario} = useContext(DataContext)


  //----------------
  //Get Editoras

  const [dadosEditora,setDadosEditora] = useState<DadosEditoraType[]>([])


  const getAllEditoras = async () => {
    
    AxiosInstance.get(
      '/editoras',
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( (resultado) => {
      console.log('Dados editoras ',JSON.stringify(resultado))
      console.log('Dados editoras - Data ',JSON.stringify(resultado.data))
      setDadosEditora(resultado.data)
    }).catch((error) => {
      console.log('error ao recuperar dados', JSON.stringify(error))
    })
  }

  useEffect(() => {
    getAllEditoras()
  },[])


  //--------------------------
  //GRID DE EDITORAS

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
      const backgroundColor = item.codigoEditora === selectedId ? "#9429ff" : "#be83f8d5";
      const color = item.codigoEditora === selectedId ? 'white' : 'black';
      const idEditora = item.codigoEditora
      return (
        <Item
          item={item}
          onPress={() =>{ 

            setSelectedId(item.codigoEditora)
            navigation.navigate('HomeEditora',{id:idEditora})
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
        );
  };
  //------------------------------------

  return (
      <>    
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom:10 }}>Home Screen</Text>
        <View>
          <Text>
            Bem-vindo, {dadosUsuario?.nome}
          </Text>
        </View>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={dadosEditora}
            renderItem={renderItem}
            keyExtractor={(dadosEditora) => dadosEditora.codigoEditora}
            extraData={selectedId}
            horizontal={true}
            scrollEnabled
            showsHorizontalScrollIndicator={true}
            style={{
              height: 100,
              flexGrow: 0
            }}
          />
        </SafeAreaView>


        <View style={{ marginBottom:10, marginHorizontal:10 }}>
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View>
          <Button
            title="Go to Home_Editora"
            onPress={() => navigation.navigate('HomeEditora')}
          />
        </View>
      </View>
      

      </>
      );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  
});


export default Home;