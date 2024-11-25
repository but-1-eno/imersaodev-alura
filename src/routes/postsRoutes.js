import express from "express"
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Cria uma instância do Express para iniciar a aplicação
    app.use(express.json());
    // Define uma rota GET para o caminho "/posts"
    app.get("/posts", listarPosts);
}

export default routes;