import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Card, Title, Paragraph} from 'react-native-paper';

import AxiosInstance from '../../api/AxiosInstance';

//Importando o Contexto de Data
import {DataContext} from '../../context/DataContext';
import {DadosEditoraType} from '../../models/DadosEditoraType';
import {DadosLivrosType} from '../../models/DadosLivrosType';


import {styles} from './style';

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.btnItem}>
    <Image
      source={{uri: item.urlImagem}}
      resizeMode="contain"
      style={styles.imgItem}
    />
    <Text style={[styles.title]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);

const HomeEditoras = ({navigation}) => {
  // ---------Use States-----------
const {dadosUsuario} = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [pesquisa, setPesquisa] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  //Barra Pesquisa

  function onChangeText(event: any) {
    setPesquisa(event.target.value);
  }

  // ----------Get Editoras---------------

  const getAllEditoras = async () => {
    AxiosInstance.get('/editoras', {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        setDadosEditora(resultado.data);
      })
      .catch(error => {
        console.log('error ao recuperar dados', JSON.stringify(error));
      });
  };

  useEffect(() => {
    getAllEditoras();
  }, []);

  //----------------------
//   const navigateHomeEditora = (id: any) => {
//     setSelectedId(id);    
//     navigation.navigate('HomeEditora', {
//       editoraId: id,
//     });
//   };

  const renderItem = ({item}) => {
    const idEditora = item.codigoEditora;
    return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.codigoEditora);
            navigation.navigate('HomeEditora', {id: idEditora});
          }}
        />
      );
    };
  //-----------------------

  return (
    <>
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            onChangeText(e);
          }}
          value={pesquisa}
          placeholder={'Pesquisar'}
        />
      </SafeAreaView>

      <View style={styles.container2}>
        <FlatList 
        numColumns={2}       
          data={dadosEditora}
          renderItem={renderItem}
          keyExtractor={item => item.codigoEditora}
          extraData={selectedId}
          horizontal={false}
        />
      </View>
      </SafeAreaView>
    </>
  );
};

export default HomeEditoras;