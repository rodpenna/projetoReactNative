import { DadosAutorType } from "./DadosAutor"
import { DadosEditoraType } from "./DadosEditoraType"


export type DadosLivroType = {
    codigoLivro: 0,
    nomeLivro:string,
    dataLancamento:string,
    cogigoIsbn:0,
    nomeImagem:string,
    nomeArquivoImagem:string,
    urlImagem:string,
    editora:DadosEditoraType,
    autor:DadosAutorType
  }