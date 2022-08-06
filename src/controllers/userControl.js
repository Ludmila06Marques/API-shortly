import db from "../postgressStrategy/pg.js"
import {v4 as uuid} from "uuid"
import bcrypt from 'bcrypt';

//users : id , name , email , password 

export async function signUp(req,res){
   const user = req.body
   console.log(req.body)

   try {
   //verifica se ja tem o usuario cadastrado
    const result= await db.query(`SELECT name FROM users  WHERE email=$1` , [user.email])
    
    if(result.rowCount>0){
        return res.send("Usuario ja cadastrado, entre").status(509)
    }
    if(user.password!== user.confirmPassword){
        return res.send("As senhas nao coincidem").status(401)
    }
    //criptografar a senha 
    const passwordCripted = bcrypt.hashSync(user.password , 10);
    //Caso nao exista  , inserir dados dentro da tabela users
    await db.query(`
            INSERT INTO users (name , email , password) 
            VALUES ($1, $2, $3)
        `, [user.name, user.email, passwordCripted])

        res.send("Usuario cadastrado com sucesso").status(200)
   } catch (error) {
    
    console.log(error)
    res.sendStatus(500)
   }

}

export async function signIn(req,res){
    const user = req.body

    const result= await db.query(`SELECT * FROM users  WHERE email=$1` , [user.email])
console.log(result.rows[0].id)
    //se existir o usuario e a senha descriptografada for igual a senha passada 
    if(result.rowCount>0  && bcrypt.compareSync(user.password , result.rows[0].password)){
        const token= uuid()
        await db.query(`
        
       INSERT INTO sessions ("userId" , token)
       VALUES($1,$2) `,[result.rows[0].id , token])
        
       res.send({token}).status(200)
    }
   
    res.sendStatus(401)
  
}

