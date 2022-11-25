import React,{useContext, useEffect,useState} from 'react';

import {
  View,
  Text,SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';

import { Card, Button, Icon } from '@rneui/themed';
import { DataContext } from '../../context/DataContext';
import {DadosLivroType} from '../../models/DadosLivroType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData,clearStorage } from '../../services/LocalStorageService';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
    <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
  </TouchableOpacity>
);



const Favorito = ({route,navigation}) => {
  const {dadosUsuario,badgeCounter} = useContext(DataContext)

  const [selectedId, setSelectedId] = useState(null);
  const [favoritos,setFavoritos] =  useState<DadosLivroType[]>([]);

  useEffect(() => {
 
    getStorageFav();

     
      
  },[]);



    const getStorageFav = async () => {
     let data = await retrieveLocalData('favLivro')
     if(data !== undefined){
      let teste=JSON.parse(data)  
      console.log(teste)    
      setFavoritos(teste) 
     }
    }
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoLivro === selectedId ? "#665313" : "#EACE73";
    const color = item.codigoLivro === selectedId ? 'white' : 'black';
  
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.codigoLivro)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Favoritos</Text>
          <View>
            <View style={styles.screenContainer}>
              <Text style={styles.itens}>Itens</Text>
              <Button 
                color="red"
                title="Remover Todos"
                onPress={() => {
                  removeLocalData('favLivro')
                  badgeCounter(0)
                }}
              />
            </View>
              <Button 
                color="blue"
                title="Atualzar"
                onPress={() => {
                  getStorageFav()
                }}
              />
          </View>
          <FlatList
            data={favoritos}
            renderItem={renderItem}
            keyExtractor={(favoritos:any) => (`fav_list${favoritos.codigoLivro}`)}
            extraData={selectedId}
          />
        </SafeAreaView>
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 32,
  },
  itens: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itenss: {
    width: 50,
    height: 50,
  },
  screenContainer: {
    flexDirection: 'row-reverse',
    padding: 20,
  },
  imgItem:{
    flex:1, 
    width:200, 
    height:200
  }
  
  
});
export default Favorito;