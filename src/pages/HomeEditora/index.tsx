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

// import CardFav from '../../components/Card/Card';

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
                <CardLayout
                  nomeLivro={o.nomeLivro}
                  codigoLivro={o.codigoLivro}
                  urlImagem={o.urlImagem}
                  nomeEditora={dadosEditora?.nomeEditora}
                  key={`editora_grid${o.codigoLivro}`}
                />
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