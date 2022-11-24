import React, {useContext, useEffect, useState} from 'react';

import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

import AxiosInstance from '../../api/AxiosInstance';

import {DataContext} from '../../context/DataContext';
import {DadosEditoraType} from '../../models/DadosEditoraType';
import {Text, Card, Button, Icon} from '@rneui/themed';
import {DadosLivrosType} from '../../models/DadosLivrosType.tsx';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);


// ------Home---------------

const Home = ({navigation}) => {
  const {dadosUsuario} = useContext(DataContext);

  //----------------
  //Get Editoras

  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [livrosRecentes, setLivrosRecentes] = useState<DadosLivrosType[]>([]);


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

  // Get Livros com filtro no id

  const getLivroRecentes = async () => {
    AxiosInstance.get('/livros', {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        let index = resultado.data.length
        setLivrosRecentes(resultado.data.filter((l:any) => l.codigoLivro > (index-5)))
        
      })
      .catch(error => {
        console.log('error ao recuperar dados', JSON.stringify(error));
      });
  };

  useEffect(() => {
    getAllEditoras(),
    getLivroRecentes();

  }, []);

  //--------------------------
  //GRID DE EDITORAS



  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor =
      item.codigoEditora === selectedId ? '#665313' : '#EACE73';
    const color = item.codigoEditora === selectedId ? 'white' : 'black';
    const idEditora = item.codigoEditora;
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.codigoEditora);
          navigation.navigate('HomeEditora', {id: idEditora});
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  //------------------------------------
 
  
  //GRID RECENTES

  const gridRecentes = ({item}) => {
    const codlgoLivro = item.codlgoLivro;
    const nomeLivro = item.nomeLivro;
    const urlImagem = item.urlImagem;

   
    return (

      <>
        
        <SafeAreaView style={styles.card}>
        <Card>
            <Card.Title>{nomeLivro}</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                  urlImagem,
              }}
            />
            <Text style={{ marginBottom: 10 }}>
             
            </Text>
            <Button
              icon={
                <Icon
                  name="code"
                  color="#ffffff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor:'#736A4D'
              }}
              title="Ver Livro"
              onPress={() =>{ 
                navigation.navigate('HomeLivro',{codlgoLivro})
              }}
            />
          </Card>
          </SafeAreaView>
      </>
      );
    
  }


  //----------------------------------

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Editoras</Text>
          <FlatList
            data={dadosEditora}
            renderItem={renderItem}
            keyExtractor={(dadosEditora: any) => dadosEditora.codigoEditora}
            extraData={selectedId}
            horizontal={true}
            scrollEnabled
            showsHorizontalScrollIndicator={true}
            style={{
              height: 100,
              flexGrow: 0,
            }}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.container2}>
          <Text style={styles.title}>Recentes</Text>
          <SafeAreaView >
            <FlatList
              data={livrosRecentes}
              renderItem={gridRecentes}
              keyExtractor={(livrosRecentes:any) => livrosRecentes.codigoLivro}
              extraData={selectedId}
              horizontal={true}
              scrollEnabled
              showsHorizontalScrollIndicator={true}
              style={{
                height: 400,
                flexGrow: 0,
                
                
              }}
            />
          </SafeAreaView>
          
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Destaque</Text>
          <Card>
            <Card.Title>{livrosRecentes[0].nomeLivro}</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{padding: 0}}
              source={{
                uri: 'https://m.media-amazon.com/images/I/61J4TVU5q6L._SX612_BO1,204,203,200_.jpg',
              }}
            />
            <Text style={{marginBottom: 10}}>
           Com diversos assassinos internacionais extremamente insanos e habilidosos prestes a invadir Tokyo, toda a Divisão Especial prepara um plano para protegê-lo!! A matança desenfreada mergulhará a cidade em um redemoinho de caos infernal!!
            </Text>
            <Button
              icon={
                <Icon
                  name="code"
                  color="#ffffff"
                  iconStyle={{marginRight: 10}}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: '#736A4D',
              }}
              title="Ver Livro"
            />
          </Card>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {},

  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#91886985',
  },

  container2: {
    flex: 2,
    paddingTop: 20,
    backgroundColor: '#91886985',
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  card: {
    height: 450,
    width: 250,
    paddingLeft: 10,
  },
});

export default Home;
