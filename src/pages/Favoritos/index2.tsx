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

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
    <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
  </TouchableOpacity>
);


const Favorito = ({route,navigation}) => {
  const {dadosUsuario} = useContext(DataContext);
  const [dadosFavoritos, setDadosFavoritos] = useState<DadosLivrosType[]>([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllFavoritos();
  },[]);

  const getAllFavoritos = async () =>{
    AxiosInstance.get(
      '/livros',
      {headers: {"Authorization": `Bearer ${dadosUsuario?.token}`}}
        ).then(resultado =>{
            console.log('Dados do livro: ' +JSON.stringify(resultado.data));
            setDadosFavoritos(resultado.data)
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados das editoras' +JSON.stringify(error));
        })
  }

  // const navigateToFavoritosHome = (id:any) =>{
  //   setSelectedId(id);
  //   navigation.navigate('HomeFavortosScreen',{
  //     edioraId: id,
  //   });
  // }

  
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
            title="Remover livro"
            onPress={() => Alert.alert('Removido com sucesso!')}
          />
          </View>
        </View>
        <FlatList
          data={dadosFavoritos}
          renderItem={renderItem}
          keyExtractor={(item) => item.codigoLivro}
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
    flex:3, 
    width:140, 
    height:140
  }
  
  
});
export default Favorito;