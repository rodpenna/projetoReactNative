import React,{useContext, useEffect,useState} from 'react';

import {
  View,
  Text,SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';

import { Card, Button, Icon } from '@rneui/themed';
import { DataContext } from '../../context/DataContext';
import {DadosLivroType} from '../../models/DadosLivroType';
import { storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData,clearStorage,removeFromFavoritosByKeyAndValue } from '../../services/LocalStorageService';
import { RadioButton } from 'react-native-paper';

// import { styles } from './style';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Image source={{uri: item.urlImagem}} resizeMode='contain' style={styles.imgItem} />    
    <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
  </TouchableOpacity>
);



const Separator = () => {
  return <View style={styles.separator} />;
};

const Selecionar = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={styles.Selecionar}>
      <RadioButton
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

const Cart = ({route, navigation}) => {
  const [itensCarrinho, setItensCarrinho] = useState<DadosLivroType[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const {dadosUsuario,badgeCounter} = useContext(DataContext)

  useEffect(() => {
    getStoragecart();
  }, []);

  const getStoragecart = async () => {
    let data = await retrieveLocalData('itemCart');
    setItensCarrinho(data ? JSON.parse(data) : []);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.codigoLivro === selectedId ? "#665313" : "#EACE73";
    const color = item.codigoLivro === selectedId ? 'white' : 'black';
  const id = item.codigoLivro
    
    return (
      <><Item
        item={item}
        onPress={() => setSelectedId(item.codigoLivro)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} />
        <Button
          onPress={()=>{
            badgeCounter(-1)
            removeItemCart(item.codigoLivro)}}
        >Excluir</Button></>
    );
  };

    const removeItemCart= (id:any) =>{
        removeFromFavoritosByKeyAndValue('itemCart',id)
    }
  
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Carrinho</Text>
         
          <View>
          
            <View style={styles.screenContainer}>
            <Text style={styles.itens}>Itens</Text>
            <Button 
            color="red"
            title="Remover Todos"
            onPress={() => {
              removeLocalData('itemCart')
              badgeCounter(0)
              console.log("limpo ?",itensCarrinho);
              
            }}
          />


          </View>
          <Button 
            color="red"
            title="Atualzar"
            onPress={() => {
              getStoragecart()
            }}
          />
        </View>
        <FlatList
          data={itensCarrinho}
          renderItem={renderItem}
          keyExtractor={(itensCarrinho:any) => itensCarrinho.codigoLivro}
          extraData={selectedId}
        />
          </SafeAreaView>

          <View>
            <Text style={styles.ValoPedido}>{itensCarrinho.length > 0 ? "Total Pedido : R$ 100" :"Carrinho Vazio" }</Text>
          </View>
      
      </>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row'
  },
  title: {
    fontSize: 32,
  },
  itens: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itenss: {
    width: 50,
    height: 50,
  },
  screenContainer: {
    flexDirection: 'row-reverse',
    padding: 20,
  },
  imgItem:{
    flex:1, 
    width:200, 
    height:200
  },
  ValoPedido:{
    fontSize:30,
    fontWeight:'900',
    alignItems:'center',
    justifyContent:"center"
  }
  
  
});


export default Cart;
