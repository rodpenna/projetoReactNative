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


const HomeEditora = ({route,navigation}) => {

  //------------------------------
  //Parametros pela rota

  const {id} = route.params
  
  const {dadosUsuario} = useContext(DataContext)
    
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
              <SafeAreaView style={{}}>
                <Card 
                  key={`editora_grid${o.codigoLivro}`} 
                  containerStyle={{
                    height:320,
                    width:200,
                    alignItems:'center',
                    justifyContent:'center',
                    marginLeft: Dimensions.get('window').width * 0.25,
                  }}
                  
                  >
                  <Card.Title
                    style={{paddingTop:10}}  
                  >
                    {o.nomeLivro}
                  </Card.Title>
                  <Card.Divider />
                  <Card.Image
                    style={{ 
                      padding: 0,
                      height:150,
                      width:120,
                      justifyContent:'center',
                    }}
                    // source={{
                    //   uri:
                    //     'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    // }}
                    source={{
                      uri:o.urlImagem}
                    }
                 
                  />
                  <Text 
                    style={{ 
                      marginBottom: 10 ,
                      marginTop: 10 ,
                    }}>
                    Editora: {dadosEditora?.nomeEditora}
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

                      navigation.navigate(
                        'HomeLivro',
                        {
                          id:o.codigoLivro,
                          nomeEditora:dadosEditora?.nomeEditora
                        }
                      )
                    }}
                  />
                </Card>  
              </SafeAreaView>
              </>)

            })
          }
        
      </SafeAreaView>
    </ScrollView>
  </SafeAreaView>
  </>
  )
}

export default HomeEditora;