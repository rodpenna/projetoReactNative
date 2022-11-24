import React,{useEffect,useState} from 'react';

import {
  View,
  SafeAreaView,TextInput,ScrollView
} from 'react-native';

import {styles} from './style'

import { SearchBar,PricingCard,lightColors,Text, Card, Button, Icon  } from '@rneui/themed';


const HomeEditora = ({route,navigation}) => {

  const {id} = route.params
  
  console.log(id);
  
  //----------------------
  //Barra Pesquisa
  const [pesquisa, setPesquisa] = useState('');

  const [nomeEditora,setNomeEditora] = useState(`Teste`)


  function onChangeSearch(event:any){
  setPesquisa(event.target.value)
  }

  useEffect(()=>{
    const stackNavigator = navigation.getParent();
    if (stackNavigator){
      stackNavigator.setOptions({title:`teste`})
    }
  },[])

  //-----------------------

  return (
  <>
  <SafeAreaView style={styles.container}>
    <SafeAreaView>
      <SearchBar
        platform="default"
        onChangeText={newVal => onChangeSearch(newVal)}
        placeholder="Digite o nome do livro"
        placeholderTextColor="#888"
        value={pesquisa}
      />
    </SafeAreaView>

    <ScrollView>
      <SafeAreaView>
          
        <Card>
          <Card.Title>
            HELLO WORLD{id}
          </Card.Title>
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
            }}
            title="Ver Livro"
            onPress={() =>{ 

              navigation.navigate('HomeLivro',{id:1})
            }}
          />
        </Card>       
      </SafeAreaView>
    </ScrollView>
    </SafeAreaView>
  </>
  )
}

export default HomeEditora;