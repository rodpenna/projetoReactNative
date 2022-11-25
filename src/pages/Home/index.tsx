import React,{useContext, useEffect, useState} from 'react'

import {
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    StatusBar,ScrollView
} from 'react-native';

import AxiosInstance from '../../api/AxiosInstance';

import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { Text, Card, Button, Icon } from '@rneui/themed';


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
      // console.log('Dados editoras ',JSON.stringify(resultado))
      // console.log('Dados editoras - Data ',JSON.stringify(resultado.data))
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
      const backgroundColor = item.codigoEditora === selectedId ? "#665313" : "#EACE73";
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
  //GRID RECENTES






  const gridRecentes = () => {

    return (

      <>
        <SafeAreaView style={styles.card}>
        <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                  'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
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
                navigation.navigate('HomeEditora',1)
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
            keyExtractor={(dadosEditora:any) => dadosEditora.codigoEditora}
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


        <SafeAreaView style={styles.container2}>
          <Text style={styles.title}>Recentes</Text>
          <SafeAreaView >
            <FlatList
              data={dadosEditora}
              renderItem={gridRecentes}
              keyExtractor={(dadosEditora:any) => dadosEditora.codigoEditora}
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
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                  'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
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
            />
          </Card>
        </SafeAreaView>
        </ScrollView>

      </>
      );
}


const styles = StyleSheet.create({
  
  header:{

  },

  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#91886985'
   
  },
  
  container2: {
    flex: 2,
    paddingTop:20,
    backgroundColor: '#91886985'
   
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    paddingBottom:10,
    paddingLeft:10
  },
  card:{
    height:450,
    width:250,
    paddingLeft:10
  }
});


export default Home;