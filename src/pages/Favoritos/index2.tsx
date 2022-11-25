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

  // useEffect(() => {
  
  //   getStorageFav();
   
      
  // },[]);


  // const getAllFavoritos = async () =>{
  //   AxiosInstance.get(
  //     '/livros',
  //     {headers: {"Authorization": `Bearer ${dadosUsuario?.token}`}}
  //       ).then(resultado =>{
  //           console.log('Dados do livro: ' +JSON.stringify(resultado.data));
  //           setDadosFavoritos(resultado.data)
  //       }).catch((error) => {
  //           console.log('Ocorreu um erro ao recuperar os dados das editoras' +JSON.stringify(error));
  //       })
  // }

  // const navigateToFavoritosHome = (id:any) =>{
  //   setSelectedId(id);
  //   navigation.navigate('HomeFavortosScreen',{
  //     edioraId: id,
  //   });
  // }

  const getStorageFav = async () => {
    let data = await retrieveLocalData('livroFav')
    setFavoritos(data ? JSON.parse(data):[]) 
   }


  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoLivro === selectedId ? "rgb(161, 157, 143)" : "rgb(161, 157, 143)";
    const color = item.codigoLivro === selectedId ? 'black' : 'black';
  const id = item.codigoLivro
    
    return (
      <View style={styles.Background}>
      <><Item 
        item={item}
        onPress={() => setSelectedId(item.codigoLivro)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} />

      <View style={styles.Botao}>
        <Button
            color={'red'}
          onPress={()=>{
            badgeCounter(-1)
            removeItemFavorito(item.codigoLivro)}}
        >Excluir</Button>
        </View>
        </>
        </View>
    );
  };

    const removeItemFavorito= (id:any) =>{
        removeFromFavoritosByKeyAndValue('livroFav',id)
    }
  
    return (
      <>
      <View style={styles.Background}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Favoritos</Text>
         
          <View>
          
            <View style={styles.screenContainer}>
            <Text style={styles.itens}></Text>
            <Button 
            color="red"
            title="Excluir Todos"
            onPress={() => {
              removeLocalData('livroFav')
              badgeCounter(0)
              console.log("limpo ?",favoritos);
              
            }}
          />


          </View >
        
          <View style={styles.screenContainer2}>
          <Button 
            color="red"
            title="Atualizar"
            onPress={() => {
              getStorageFav()
            }}
          />
          </View>
        </View>

        <FlatList 
          data={favoritos}
          renderItem={renderItem}
          keyExtractor={(favoritos:any) => favoritos.codigoLivro}
          extraData={selectedId}
        />
          </SafeAreaView>
          </View>
      </>
    );

}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 70,
  },
  Favoritos:{
    fontSize: 30,
    marginLeft:10
  },
  title: {
    fontSize: 25,

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
    width:200, 
    height:150,
  },
  Background:{
    backgroundColor:'rgb(192, 187, 171)'
  },
  Botao:{
    marginLeft:70,
    marginRight:70
  },
  screenContainer2: {
    flexDirection: 'row',
    top:-59,
    marginLeft:60
  },
  
});
export default Favorito;