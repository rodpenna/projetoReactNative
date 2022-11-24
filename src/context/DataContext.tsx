import React, {createContext, useState} from 'react';

import { DadosUsuarioType } from '../models/DadosUsuarioType';

import jwt_decode from 'jwt-decode';

export const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
    const [livroSelecionada, setLivroSelecionado] = useState<number>();
    
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

    const armazenaLivroSelecionado = (id:number) => {
        setLivroSelecionado(id);
    }

    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario,
            armazenaLivroSelecionado
        }}>
            {children}
        </DataContext.Provider>
    )
}