import React, {createContext, useState} from 'react';

import { DadosUsuarioType } from '../models/DadosUsuarioType';

import jwt_decode from 'jwt-decode';

export const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
    const [totalBadge,setTotalBadge] = useState(0)
    
    const badgeCounter = (signal=1) =>{
        if (signal===0){
            setTotalBadge(0)
        }else if(signal===1){
            let total = totalBadge
            setTotalBadge(total+1)
        }else{
            let total = totalBadge
            setTotalBadge(total-1)   
        }
   

    }
    
    const armazenarDadosUsuario = (jwt:any) =>{
        var tokenDecodificado:any = jwt_decode(jwt);

        var usuario = tokenDecodificado.usuario;

        usuario = JSON.parse(usuario);

        setDadosUsuario({
            id:usuario?.userId,
            nome:usuario?.usuarioNome,
            email:usuario?.userEmail,
            token:jwt
        })
    }

    const [totalCarrinho,setTotalCarrinho] = useState(0)
    
    const carrinhoCounter = (signal=1) =>{
        if (signal===0){
            setTotalCarrinho(0)
        }else if(signal===1){
            let total = totalCarrinho
            setTotalCarrinho(total+1)
        }else{
            let total = totalCarrinho
            setTotalCarrinho(total-1)   
        }
   

    }



    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario,
            badgeCounter,
            totalBadge,
            carrinhoCounter,
            totalCarrinho
        }}>
            {children}
        </DataContext.Provider>
    )
}