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
import { DadosLivroType } from '../../models/DadosLivroType';
import {DadosLivrosType} from '../../models/DadosLivrosType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData,clearStorage } from '../../services/LocalStorageService';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
    <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
  </TouchableOpacity>
);



const Favorito = ({route,navigation}) => {
  const {dadosUsuario,badgeCounter} = useContext(DataContext)
  const [dadosFavoritos, setDadosFavoritos] = useState<DadosLivrosType[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [favoritos,setFavoritos] =  useState<DadosLivrosType[]>([]);

  useEffect(() => {
    // getAllFavoritos();
    getStorageFav();
    // const data = retrieveLocalData('livroFav')
    //    setFavoritos(data)
    // console.log('oi',data);
     
      
  },[favoritos]);

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
     const data = await retrieveLocalData('livroFav')
     if(data !== undefined){
      let teste=JSON.parse(data)      
      setFavoritos(teste) 
     }
    }
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoLivro === selectedId ? "#rgb(161, 157, 143)" : "#rgb(161, 157, 143)";
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
          <Text style={styles.Favoritos}>Favoritos</Text>
         
          <View>
          
            <View style={styles.screenContainer}>
            {/* <Text style={styles.itens}>Itens</Text> */}
            <Button 
            color="red"
            title="Remover Todos"
            onPress={() => {
              removeLocalData('livroFav')
              badgeCounter(0)
              
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
      
      </>
    );

}

const styles = StyleSheet.create({
  container: {
    marginTop:10
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
    height:150
  }
  
  
});
export default Favorito;