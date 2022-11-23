import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert
  } from 'react-native';

/*
*Props
* email,senha
*/
const Alerta = (texto) => {

    // function onAlert(){
    //     Alert.alert(`Nome de usuário ou senha inválido, tente novamente`)

    // }
    Alert.alert(`${texto}, tente novamente`)
    // return(
    //     <>
    //     <View>
    //         {onAlert()}
    //     </View>
    //     </>
    // )
}

export default Alerta;