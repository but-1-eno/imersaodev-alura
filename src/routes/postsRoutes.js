import express from "express"
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

//Configuração exclusiva para o Windows salvar o nome do arquivo.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
// FIM - Para Mac ou Linux usar somente a linha abaixo.
const upload = multer({ dest: "./uploads" , storage})
//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    // Cria uma instância do Express para iniciar a aplicação
    app.use(express.json());
    // Rota para ler um post
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost );
    // Rota para fazer upload de um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem)
}

export default routes;