import React,{useEffect,useState,useContext} from 'react';

import {
  View,
  SafeAreaView,TextInput,Dimensions,ScrollView
} from 'react-native';

import { styles } from './style';


import { SearchBar,PricingCard,lightColors,Text, Card, Button, Icon  } from '@rneui/themed';
import { DadosLivroType } from '../../models/DadosLivroType';

import AxiosInstance from '../../api/AxiosInstance';

import { DataContext } from '../../context/DataContext';

import {incrementLocalData} from '../../services/LocalStorageService'
import CardLayout from '../../components/Card/Card';


const HomeLivro = ({route,navigation}) => {

    //------------------------
    //Parametros pela rota

    const {id} = route.params

    const {dadosUsuario,badgeCounter,carrinhoCounter} = useContext(DataContext)


    //----------------------
    //Barra Pesquisa
    const [pesquisa, setPesquisa] = useState('');
    
    function onChangeSearch(event:any){
    setPesquisa(event.target.value)
    }

    //-----------------------
    //Card Livro

    const [dadosLivro,setDadosLivro] = useState<DadosLivroType>()
    
    
    const getLivroData = async () => {
      console.log(id)
      AxiosInstance.get(`/livros/${id}`, {
        headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
      })
        .then(resultado => {
          
          console.log(resultado.data)
          setDadosLivro(resultado.data)
        })
        .catch(error => {
          console.log('Error Axios - getLivroData', JSON.stringify(error));
        });
    };


      useEffect(() => {
        getLivroData()
      },[])



    //--------------------------
    //Favoritos

    const addFavorite = (livro:any) => {
      //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
      incrementLocalData('livroFav', livro);
      
    }






    //---------------------------
    //Carrinho

    function addCarrinho (livro:any){
      
      incrementLocalData('itemCart', livro )

    }

    //----------------




    return (
    <>
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.containerGlobal}>
        <Card 
        key={`livro_dest${dadosLivro?.codigoLivro}`} 
        containerStyle={styles.containerCard}
        >
          <Card.Title
            style={styles.mainTitle}  
          >
            {dadosLivro?.nomeLivro}
          </Card.Title>

          <Card.Divider />

          <Card.Image
            style={styles.cardImage}
            source={{
              uri:dadosLivro?.urlImagem}
            }
          />
          <SafeAreaView>

          <SafeAreaView>
          <Text 
            style={styles.mainText}>
            Editora: {dadosLivro?.editoraDTO?.nomeEditora}
          </Text>
          </SafeAreaView>
          <Card.Divider />
          <SafeAreaView>
          <Text
            style={styles.mainText}>
            Preço:               R$ 30,00
          </Text>
          </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.containerGlobalButton}>
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
                  carrinhoCounter(1)
                  addCarrinho(dadosLivro)
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
                badgeCounter(1)
                addFavorite(dadosLivro)
                }}
              />
            </SafeAreaView>
            </SafeAreaView>
          </Card>  
      </SafeAreaView>
    </SafeAreaView>



    </>
    )
}

export default HomeLivro;