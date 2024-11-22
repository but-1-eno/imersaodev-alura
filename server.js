import express from 'express';
const posts = [
    {
      id: 1,
      descricao: "Um gatinho curioso olhando para a câmera.",
      imagem: "https://http.cat/gif"
    },
    {
      id: 2,
      descricao: "Gatinho ronronando e se aconchegando em uma manta.",
      imagem: "https://http.cat/cute"
    },
    {
      id: 3,
      descricao: "Um gatinho brincando com um novelo de lã.",
      imagem: "https://http.cat/playing"
    },
    {
      id: 4,
      descricao: "Gatinho sonolento tomando um cochilo na luz do sol.",
      imagem: "https://http.cat/sleep"
    },
    {
      id: 5,
      descricao: "Um gatinho com uma expressão muito séria.",
      imagem: "https://http.cat/condescending"
    }
  ];
  
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Olá Mundo");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});