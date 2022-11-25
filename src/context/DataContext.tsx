import React, {createContext, useState} from 'react';

import { DadosUsuarioType } from '../models/DadosUsuarioType';

import jwt_decode from 'jwt-decode';

export const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
    
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

    //-------------------
    //Badge Favorito
    const [totalBadge,setTotalBadge] = useState(0)      
    
    const badgeCounter = (signal:any) =>{
        if (signal===0){
            setTotalBadge(0)
        }else{
            let total = totalBadge
            setTotalBadge(total+1)

        }

    }

    //--------------------------
    //Carrinho
    const [totalCarrinho,setTotalCarrinho] = useState(0)      
    
    const badgeCarrinho = (signal:any) =>{
        if (signal===0){
            setTotalCarrinho(0)
        }else{
            let total = totalBadge
            setTotalCarrinho(total+1)
        }
    }




    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario,
            badgeCounter,
            totalBadge,
            totalCarrinho,
            badgeCarrinho

        }}>
            {children}
        </DataContext.Provider>
    )
}