import React,{useEffect,useState} from 'react';

import {
  View,
  Text,SafeAreaView,TextInput
} from 'react-native';

import { styles } from './style';






const HomeEditoras = ({route,navigation}) => {

    const {id} = route.params
    
    //----------------------
    //Barra Pesquisa
    const [pesquisa, setPesquisa] = useState('');
    
    function onChangeText(event:any){
    setPesquisa(event.target.value)
    }



    //-----------------------

    return (
    <>
        <View>
            <Text>Home EditoraS</Text>
            <Text>{id}</Text>
            <Text>Texto</Text>
        </View>

        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={ (e) => {onChangeText(e)}}
                value={pesquisa}
            />
        </SafeAreaView>
    </>
    )
}

export default HomeEditoras;