// Importa a função para conectar ao banco de dados
import conectarAoBanco from "../config/dbconfig.js"
// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função assíncrona para obter todos os posts do banco de dados
export default async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes")
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts")
    // Executa uma consulta para encontrar todos os documentos na coleção e retorna como um array
    return colecao.find().toArray()
}