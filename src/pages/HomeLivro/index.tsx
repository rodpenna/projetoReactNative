import React,{useEffect,useState} from 'react';

import {
  View,
  Text,SafeAreaView,TextInput
} from 'react-native';

import { styles } from './style';

import { Searchbar } from 'react-native-paper';




const HomeLivro = ({route,navigation}) => {

    const {id} = route.params
    
    //----------------------
    //Barra Pesquisa
    const [pesquisa, setPesquisa] = useState('');
    
    function onChangeSearch(event:any){
    setPesquisa(event.target.value)
    }


    //-----------------------

    return (
    <>
        <View>
            <Text>Home Livro</Text>
            <Text>{id}</Text>
            <Text>Texto</Text>
        </View>

        <SafeAreaView>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={pesquisa}
            />
        </SafeAreaView>
    </>
    )
}

export default HomeLivro;