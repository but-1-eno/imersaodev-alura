import express from "express"
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionSucessStatus: 200
}

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
    app.use(cors(corsOptions))
    // Rota para ler um post
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost );
    // Rota para fazer upload de um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualizar um post já existente
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;