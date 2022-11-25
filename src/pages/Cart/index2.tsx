import React,{useEffect,useState} from 'react';
import {View,Text,SafeAreaView,TextInput,StyleSheet, ScrollView } from 'react-native';
import { Button,Card, Icon } from '@rneui/themed';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RadioButton } from 'react-native-paper';
import {DadosLivroType} from '../../models/DadosLivroType';
import { retrieveLocalData } from '../../services/LocalStorageService';



// import { styles } from './style';

const Separator = () => {
  return <View style={styles.separator} />;
}



const Selecionar = () => {
  const [checked, setChecked] = React.useState('first');
  

  return (
    <View style={styles.Selecionar}>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

const Cart = ({route,navigation}) => {
  
  const [itensCarrinho,setItensCarrinho] =  useState<DadosLivroType[]>([]);

  useEffect(() => {
    getStoragecart()
  },[])


  const getStoragecart = async () => {
    let data = await retrieveLocalData('itemCart')
    setItensCarrinho(data ? JSON.parse(data):[]) 
   }
   
  <ScrollView>
    
       return (
        <>
               <SafeAreaView>
                
               <View>
    
                <View>
                  <Text style={styles.Pedido}>Pedido</Text>
                </View>
    
    
                  <Card.Divider />
                  <Card.Image
                    style={{ padding: 0 }}
                    source={{
                      uri:
                        // c.urlImagem,
                        'https://m.media-amazon.com/images/I/618v5IiSaZL.jpg'
                    }}
                  />
                  <View></View>
    
                  <Separator></Separator>
    
                  <View >
                    <Text style={styles.Total}>Total R$10</Text>
                  </View> 
    
                  <Separator></Separator>
    
                
    
                  <Text style={styles.Pagamento}>Pagamento</Text>
    
                  <View >
                    <Text style={styles.Boleto}><Ionicons name="cash" size={20}/>Boleto</Text>
                  </View>
    
                  <View>
                    <Text style={styles.Cartao}> <Ionicons name="card" size={20}/>Cartão de credito</Text>
                  </View>
    
                  <View>
                    <Selecionar></Selecionar>
                  </View>
    
                </View>
    
                <Button 
                 buttonStyle={{
                    marginLeft: 100,
                    marginRight: 100,
                    backgroundColor:'#736A4D'
                  }}
                  title="Finalizar compra"
                />
    
            </SafeAreaView>
        
        
        </>)
  </ScrollView>
   
}

const styles = StyleSheet.create({
   separator: {
  marginVertical: 30,
  borderBottomColor: "black",
  borderBottomWidth: StyleSheet.hairlineWidth
},
Pedido:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 20,
  marginLeft:10,
},
Pagamento:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 20,
  marginLeft:10,
  marginBottom:20
},
Total:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 20,
  marginLeft:140,
},
Selecionar:{
  marginLeft:330,
  bottom:74,
},
Boleto:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 15,
  marginLeft:12,
  marginBottom:10
},
Cartao:{
  color: 'black',
  fontWeight: 'bold',
  fontSize: 15,
  marginLeft:8,
  marginBottom:10,
}
});

export default Cart;