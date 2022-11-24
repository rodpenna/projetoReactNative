
import { Dimensions, StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#91886985',
      paddingTop:10
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
      height:500,
      width:250,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#49484143',
      paddingTop:10,
      marginTop:100
      
  },

  mainTitle:{
      fontSize:18,
      color:'#000000',
      paddingTop:10
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

  button:{
      borderRadius: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      height:50,
      width:50,
      backgroundColor:'#494841fc',
      justifyContent:'center',
  },
});