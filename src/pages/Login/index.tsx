import React ,{useContext, useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,ActivityIndicator,SafeAreaView
  
} from 'react-native';

import Alerta from '../../components/Alert/Alerta'

import AxiosInstance from '../../api/AxiosInstance';

import { styles } from './style';

import Modal from '../../components/Modal/Modal'

import { DataContext } from '../../context/DataContext';

const Login = ({navigation}) => {

  //---------------------------
  //Loading
  const [loading,setLoading] = useState(false)


  //----------------------------
  //Modal
  const [modal, setModal] = useState(false)

  //------------------------------
  //Contexto

  const {armazenarDadosUsuario} = useContext(DataContext)
  //------------------------------




  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function goHome(){

    setLoading(true)

    let timer1 = setTimeout(() => {
      navigation.navigate('BottomNavigator')  
      setLoading(false)    
    }, 500);
    
  }

  //user1@mail.com
  //123
  const handleLogin = async () => {

    var tokenJwt:any = null;

    try{
      const retorno = await AxiosInstance.post('/auth/login',{
        email:email,
        password:senha
      })
      
      if (retorno.status===200){
        
        tokenJwt = retorno.data
        armazenarDadosUsuario(tokenJwt['jwt-token'])
        goHome()
      }
      else{
        Alerta('Email ou Senha inválidos')
      }
      
    }catch( error){
      Alerta('Email ou Senha inválidos')
      console.log('Erro de autenticacao,'+JSON.stringify(error))
      
    }
  }


  if (!loading){

    return (
      <>
        <View style={styles.container}>
  
          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Book Storage</Text>
          </View>
  
          <View style={styles.conteudo}>
  
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='E-mail' />
            <TextInput value={senha} onChangeText={setSenha} style={styles.input} placeholder='Senha' secureTextEntry={true} />
  
          </View>
  
          <View style={styles.rodape}>
              <TouchableOpacity style={styles.botao}>
                <Text onPress={handleLogin} style={styles.textoBotao}>Login</Text>
              </TouchableOpacity>
          </View>
       
      
     
              
        </View>
      </>
    );

  }
  else{

    return (<>
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#4E5AA6" />
      </SafeAreaView>
    </>)

  }


  
};





export default Login;
