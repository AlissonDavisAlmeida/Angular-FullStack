const express = require("express")


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-Width, Content-Type, Accept")
    next()
})

app.post("/api/posts/add",(req, res, next)=>{
   const post = req.body;
   console.log(post)
   res.status(201).json({
       message:"Adicionado com sucesso",
        post : post
   })
})

app.use("/api/posts",(req, res, next)=>{
    const post = [
        {titulo:"Cachorro", conteudo:"Rottweiler"},
        {titulo:"Cachorro", conteudo:"Rottweiler"},
        {titulo:"Cachorro", conteudo:"Rottweiler"},
    ]
 
    res.status(200).json(post)
})



module.exports = app