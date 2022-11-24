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
const CardLayout = (props,{nav}) => {
  
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
                  nav(
                    props.codigoLivro,
                    props.nomeEditora
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
    






{/*   
  <SafeAreaView style={{}}>

           
    <Card 
      key={`editora_grid${props.codigoLivro}`} 
      containerStyle={{
        height:320,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginLeft: Dimensions.get('window').width * 0.25,
    }}>
      <Card.Title
        style={{paddingTop:10}}  
      >
        {props.nomeLivro}
      </Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ 
          padding: 0,
          height:150,
          width:100,
          alignItems: 'center',
          justifyContent:'center',
        }}
        source={{
          uri:props.urlImagem}
        }
      />
      <Text 
        style={{ 
          marginBottom: 10 ,
          marginTop: 10 ,
        }}>
        Editora: {props.nomeEditora}
      </Text>

    <SafeAreaView style={{    
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <SafeAreaView style={{ flex: 1, }}>
        <Button
            icon={
            <Icon
                name="info"
                color="#000"
                iconStyle={{ marginRight: 10 }}
            />
            }
            buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            height:50,
            width:50
            }}
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
                color="#000"
                iconStyle={{ marginRight: 10 }}
            />
            }
            buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            height:50,
            width:50
            }}
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
                color="#000"
                iconStyle={{ marginRight: 10 }}
            />
            }
            buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            height:50,
            width:50
            }}
            onPress={() =>{ 
            console.log("Adicionado aos favoritos")
            }}
        />
        </SafeAreaView>
    </SafeAreaView>




     

    </Card>  
  </SafeAreaView>
     */}



  </>
  )
}







export default CardLayout;