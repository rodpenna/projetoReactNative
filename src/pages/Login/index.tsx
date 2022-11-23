import React ,{useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
  
} from 'react-native';

import Alerta from '../../components/Alert/Alerta'

import AxiosInstance from '../../api/AxiosInstance';

import { styles } from './style';

import Modal from '../../components/Modal/Modal'
import Modal2 from '../../components/Modal/Modal2'

const Login = ({navigation}) => {


  //--------MODAL ----------------
  const [modal, setModal] = useState(false)



  //------------------------------





  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function goHome(){

    // navigation.navigate('Home')

    let timer1 = setTimeout(() => {
      navigation.navigate('Home')
  }, 3000);
  }

  //user1@mail.com
  //123
  const handleLogin = async () => {
    try{
      const retorno = await AxiosInstance.post('/auth/login',{
        email:email,
        password:senha
      })
      setModal(true)
      if (retorno.status===200){
        console.log('retorno :' + JSON.stringify(retorno.data))
        // Alert.alert('Logado com sucesso')
        goHome()
      }
      else{
        
      }
      
    }catch( error){
      
      console.log('Erro de autenticacao,'+JSON.stringify(error))
      
    }
  }



  return (
    <>
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Bem-Vindo</Text>
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

        <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
      

        <Modal 
          show={modal}
          close={() => setModal(false)}
        />

   
            
      </View>
    </>
  );
};





export default Login;
