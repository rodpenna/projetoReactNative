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
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData,clearStorage,removeFromFavoritosByKeyAndValue } from '../../services/LocalStorageService';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  },[favoritos]);


  const getStorageFav = async () => {
    let data = await retrieveLocalData('livroFav')
    setFavoritos(data ? JSON.parse(data):[]) 
   }


  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoLivro === selectedId ? "#665313" : "#EACE73";
    const color = item.codigoLivro === selectedId ? 'white' : 'black';
  const id = item.codigoLivro
    
    return (
      <><Item
        item={item}
        onPress={() => setSelectedId(item.codigoLivro)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} />
        <Button
          onPress={()=>{
            badgeCounter(-1)
            removeItemFavorito(item.codigoLivro)}}
        >Excluir</Button></>
    );
  };

    const removeItemFavorito= (id:any) =>{
        removeFromFavoritosByKeyAndValue('livroFav',id)
    }
  
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
          <Ionicons name='star' size={20}/>
            Favoritos</Text>
          <View>
          
            <View style={styles.screenContainer}>
            <Text style={styles.itens}>Itens : {favoritos.length}</Text>
            <Button 
            color="red"
            title="Remover Todos"
            onPress={() => {
              removeLocalData('livroFav')
              badgeCounter(0)
              console.log("limpo ?",favoritos);
              
            }}
          />


          </View>
          <Button 
            color="red"
            title="Atualzar"
            onPress={() => {
              getStorageFav()
            }}
          />
        </View>
        <FlatList
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={(favoritos:any) => (`fav_${favoritos.codigoLivro}`)}
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
    fontSize: 20,
    fontWeight:'800'
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
    width:100, 
    height:100,
    
  }
  
  
});
export default Favorito;