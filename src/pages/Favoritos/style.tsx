
import { Dimensions, StyleSheet } from 'react-native';

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
      width: Dimensions.get('window').width * 0.7,
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
    title: {
      color: '#fff',
      fontSize: 22
    },
    button: {
      borderRadius: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      height:50,
      width:50,
      backgroundColor:'#494841fc',
      justifyContent:'center',
    },
    containerGlobal: {
      height:400,
      width:250,
      alignItems:'center',
      justifyContent:'center',
      marginLeft: Dimensions.get('window').width*0.2,
      marginBottom:30,
      marginTop:20,
      
      
  },

  containerCard:{
      height:400,
      width:250,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#49484143',
      
  },

  mainTitle:{
      fontSize:18,
      color:'#000000'
  },

  cardImage:{
      padding: 0,
      height:220,
      width:150,
      alignItems: 'center',
      justifyContent:'center',
  },

  mainText:{
      fontSize:18,
      color:'#000000',
      marginBottom: 10 ,
      marginTop: 10 ,
      
  },

  containerGlobalButton:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      marginLeft:0,
  },

  containerButton:{
      flex: 1,
      justifyContent:'center',
  },


});