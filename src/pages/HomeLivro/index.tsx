import React,{useEffect,useState,useContext} from 'react';

import {
  View,
  SafeAreaView,TextInput,Dimensions
} from 'react-native';

import { styles } from './style';


import { SearchBar,PricingCard,lightColors,Text, Card, Button, Icon  } from '@rneui/themed';
import { DadosLivroType } from '../../models/DadosLivroType';

import AxiosInstance from '../../api/AxiosInstance';

import { DataContext } from '../../context/DataContext';


const HomeLivro = ({route,navigation}) => {

    //------------------------
    //Parametros pela rota

    const {id} = route.params


    const {dadosUsuario} = useContext(DataContext)


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
    
        AxiosInstance.get(
          `/livros/${id}`,
          {headers: {"Authorization" : `Bearer ${dadosUsuario?.token}`}}
        ).then( (resultado) => {
            
            console.log(resultado.data.editoraDTO.nomeEditora)
          setDadosLivro(resultado.data)
        }).catch((error) => {
          console.log('error ao recuperar dados', JSON.stringify(error))
        })
      }


      useEffect(() => {
        getLivroData()
      },[])



    //--------------------------
    return (
    <>


        <SafeAreaView style={styles.container}>
            {
                 <Card 
                 key={`livro_detail${dadosLivro?.codigoLivro}`} 
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
                   {dadosLivro?.nomeLivro}
                 </Card.Title>
                 <Card.Divider />
                 <Card.Image
                   style={{ 
                     padding: 0,
                     height:150,
                     width:120,
                     justifyContent:'center',
                   }}
                   source={{
                     uri:dadosLivro?.urlImagem}
                   }
                
                 />
                 <Text 
                   style={{ 
                     marginBottom: 10 ,
                     marginTop: 10 ,
                   }}>
                   Editora: {dadosLivro?.editoraDTO?.nomeEditora}
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
                   title="Comprar"
                   onPress={() =>{ 

                     navigation.navigate('HomeLivro',{id:dadosLivro?.codigoLivro})
                   }}
                 />
               </Card>  
            }

        </SafeAreaView>



    </>
    )
}

export default HomeLivro;