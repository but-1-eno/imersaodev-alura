import { getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemini/geminiService.js"

export async function listarPosts(req, res) {
    // Chama a função para obter todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta com status 200 (sucesso) e os posts no formato JSON
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // tudo que vier no body da requisição ficará disponível na variável novoPost
    const novoPost = req.body;
    
    //tratativa de erros
    try { //tenta criar um novo post, se falhar .. segue no catch
        const postCriado = await criarPost(novoPost); //aqui vem o retorno do banco, '(return colecao.insertOne(novoPost))', de postModel.js .
        res.status(200).json(postCriado);
    } catch(erro) { //grava automaticamente o erro, se houver, na variavel erro
        console.error(erro.message); //devolve erro emdetalhes para o console
        res.status(500).json({"Erro":"Falha na requisição"}) //erro que aparece pra o usuário
    }
}
export async function uploadImagem(req, res) {
    // tudo que vier no body da requisição ficará disponível na variável novoPost
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    
    //tratativa de erros
    try { //tenta criar um novo post, se falhar .. segue no catch
        const postCriado = await criarPost(novoPost); //aqui vem o retorno do banco, '(return colecao.insertOne(novoPost))', de postModel.js .
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch(erro) { //grava automaticamente o erro, se houver, na variavel erro
        console.error(erro.message); //devolve erro emdetalhes para o console
        res.status(500).json({"Erro":"Falha na requisição"}) //erro que aparece pra o usuário
    }
}

export async function atualizarNovoPost(req, res) {

    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`    
    
    try { 
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post); 
        res.status(200).json(postCriado);
    } catch(erro) { 
        console.error(erro.message); 
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}