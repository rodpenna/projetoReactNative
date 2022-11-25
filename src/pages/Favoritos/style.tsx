

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

export const styles = StyleSheet.create({
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
    }
    
    
  });