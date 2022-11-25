import React,{useEffect,useState,useContext} from 'react';

import {
  View,
  SafeAreaView,TextInput,ScrollView,Dimensions
} from 'react-native';

import {styles} from './style'

import { SearchBar,PricingCard,lightColors,Text, Card, Button, Icon  } from '@rneui/themed';
import { DadosLivroType } from '../../models/DadosLivroType';

import AxiosInstance from '../../api/AxiosInstance';

import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import CardLayout from '../../components/Card/Card';
import { incrementLocalData } from '../../services/LocalStorageService';

// import CardFav from '../../components/Card/Card';

const HomeEditora = ({route,navigation}) => {

  //------------------------------
  //Parametros pela rota

  const {id} = route.params
  
  const {dadosUsuario,badgeCounter} = useContext(DataContext)
    
  //----------------------
  //Barra Pesquisa
  const [pesquisa, setPesquisa] = useState('');

  const [nomeEditora,setNomeEditora] = useState(`Teste`)


  function onChangeSearch(event:any){
  setPesquisa(event.target.value)
  }

  //-------------------------------
  //Grid Livros

  const [listaLivro,setListaLivro] = useState<DadosLivroType[]>([])

  const [dadosEditora,setDadosEditora] = useState<DadosEditoraType>()

  const getEditoraData = async () => {
    
    AxiosInstance.get(
      `/editoras/${id}`,
      {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
    ).then( (resultado) => {
  
      // console.log('Dados editora - Data ',JSON.stringify(resultado.data))
      setDadosEditora(resultado.data)
      setListaLivro(resultado.data.listaLivrosDTO)
    }).catch((error) => {
      console.log('error ao recuperar dados', JSON.stringify(error))
    })
  }

  useEffect(() => {
    getEditoraData()
  },[])



  //-----------------------
  //Cabeçalho

  useEffect(()=>{

    const stackNavigator = navigation.getParent();
  

    if (stackNavigator){
      stackNavigator.setOptions({title:`teste`})
    }
    
  },[])


  // ----Add Favorito-------------

  const addFavorite = (livro:any) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('livroFav', livro);
  }
  
  //-------------------


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
            {
            listaLivro.map((o)=>{
              return(
              <>
                <SafeAreaView style={styles.containerGlobal}>
                  <Card 
                    key={`grid_editora_livro${o.codigoLivro}`} 
                    containerStyle={styles.containerCard}
                    >
                    <Card.Title
                      style={styles.mainTitle}  
                    >
                      {o.nomeLivro}
                    </Card.Title>

                    <Card.Divider />

                    <Card.Image
                      style={styles.cardImage}
                      source={{
                        uri:o.urlImagem}
                      }
                    />
                    <Text 
                      style={styles.mainText}>
                      Editora: {o.editoraDTO?.nomeEditora}
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
                                navigation.navigate('HomeLivro',{
                                  id:o.codigoLivro,
                                  nomeEditora:o.editoraDTO?.nomeEditora
                                })
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
                            badgeCounter(1)
                            addFavorite(o)
                            }}
                          />
                        </SafeAreaView>
                      </SafeAreaView>    
                    </Card>  
                  </SafeAreaView>


              </>
              )
            }
            )
          }
      </SafeAreaView>

    </ScrollView>
  </SafeAreaView>
  </>
  )
}

export default HomeEditora;