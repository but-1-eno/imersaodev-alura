import getTodosPosts from "../models/postModel.js";

export async function listarPosts(req, res) {
    // Chama a função para obter todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta com status 200 (sucesso) e os posts no formato JSON
    res.status(200).json(posts);
}