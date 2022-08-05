import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import router from './routes/roteador.js'


const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()

app.use(router);



app.listen(process.env.PORT ,()=>{
    console.log("ta funfando")
})