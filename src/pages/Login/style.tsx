
import { Dimensions, StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7054b6a7'
    },
    cabecalho: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingVertical: 20,
      marginBottom: 10
    },
    titulo: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000'
    },
    conteudo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 13,
        paddingBottom:10,
        fontWeight: "bold"
    },
    rodape: {
      flex: 1,
      alignItems: 'center',
      marginTop:50
    },
    botao: {
        backgroundColor: '#190152',
        width: Dimensions.get('window').width * 0.9,
        paddingVertical: 20,
        borderRadius: 10,
    },
    textoBotao: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    title: {
      color: '#fff',
      fontSize: 22
    },
    button: {
      height: 50,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      marginTop: 20
    }
});