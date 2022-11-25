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
    editoraDTO:DadosEditoraType,
    autorDTO:DadosAutorType,
    preco:0
  }