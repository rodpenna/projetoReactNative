import React,{useEffect,useState,useContext} from 'react';

import {
  View,
  SafeAreaView,TextInput,ScrollView,Dimensions,FlatList
} from 'react-native';


import { SearchBar,PricingCard,lightColors,Text, Card, Button, Icon  } from '@rneui/themed';

import  {styles}  from './style';

import { incrementLocalData } from '../../services/LocalStorageService';


/*  Props
* -nomeLivro
* -codigoLivro
* -urlImagem
* -nomeEditora
* -key
*/
const CardLayout = (props) => {
  
  const addFavorite = (livro) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('livroFav', livro);
  }

  return (
  <>

<SafeAreaView style={styles.containerGlobal}>

           
    <Card 
      key={props.key} 
      containerStyle={styles.containerCard}
      >
      <Card.Title
        style={styles.mainTitle}  
      >
        {props.nomeLivro}
      </Card.Title>

      <Card.Divider />

      <Card.Image
        style={styles.cardImage}
        source={{
          uri:props.urlImagem}
        }
      />
      <Text 
        style={styles.mainText}>
        Editora: {props.nomeEditora}
      </Text>

    <SafeAreaView style={styles.containerGlobalButton}>
        <SafeAreaView style={styles.containerButton}>
            <Button
                icon={
                <Icon
                    name="info"
                    color='#fff'
                    iconStyle={{ marginRight: 10 }}
                />
                }
                buttonStyle={styles.button}
                title=""
                onPress={() =>{ 
                navigation.navigate(
                    'HomeLivro',
                    {
                    id:props.codigoLivro,
                    nomeEditora:props.nomeEditora
                    }
                )
                }}
            />
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1,  }}>
            <Button
                icon={
                <Icon
                    name="add-shopping-cart"
                    color='#fff'
                    iconStyle={{ marginRight: 10 }}
                />
                }
                buttonStyle={styles.button}
                title=""
                onPress={() =>{ 
                console.log("Adicionado carrinho")
                }}
            />
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1, }}>
            <Button
                icon={
                <Icon
                    name="favorite"
                    color='#fff'
                    iconStyle={{ marginRight: 10 }}
                />
                }
                buttonStyle={styles.button}
                onPress={() =>{ 
                console.log("Adicionado aos favoritos")
                // addFavorite(props.livro)
                }}
            />
        </SafeAreaView>
    </SafeAreaView>
   

    </Card>  
  </SafeAreaView>
    

  </>
  )
}







export default CardLayout;