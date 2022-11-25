import { Dimensions, StatusBar, StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#91886985'
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
        backgroundColor: '#68520a',
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
    button: {
      height: 50,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      marginTop: 20
    },
    container2: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      // alignItems:'center',
      justifyContent:'space-around'

    },
    item: {
      marginHorizontal: 8,
      marginBottom:20,
      padding:10,
      width:200,
      height:200,
      justifyContent:'center',
      flexDirection:"row",
      alignItems:'center',
    },
    sectionTitle: {
      fontSize: 24,
      marginLeft: 10,
      marginBottom:6,
      fontWeight: 'bold'
    },
    title: {
      fontSize: 16,
      flex:.8
    },
    btnItem:{
      flexDirection:"column",
      alignItems:'center',
      justifyContent:'center', 
      width:200, 
      height:200, 
      marginBottom: 60
    },
    imgItem:{
      flex:3, 
      width:150, 
      height:150
    }
});