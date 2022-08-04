import db from "../postgressStrategy/pg.js"
import {v4 as uuid} from "uuid"

//users : id , name , email , password , confrmPassword

export async function signUp(){
   const user = req.body

   try {
   //verifica se ja tem o usuario cadastrado
    const result= await db.query(`SELECT name FROM users  WHERE email=$1` , [user.email])
    
    if(result.rowCount>0){
        return res.sendStatus(409)
    }
    //criptografar a senha 
    const passwordCripted = bcrypt.hashSync(user.password , 10);
    //Caso nao exista  , inserir dados dentro da tabela users
    await db.query(`
            INSERT INTO users (name , email , password, confirmPassword) 
            VALUES ($1, $2, $3, $4)
        `, [user.name, user.email, passwordCripted ,passwordCripted])

        res.sendStatus(201)
   } catch (error) {
    
    console.log(error)
    res.sendStatus(500)
   }

}

export async function signIn(){
    const user = req.body

    const result= await db.query(`SELECT name FROM users  WHERE email=$1` , [user.email])

    //se existir o usuario e a senha descriptografada for igual a senha passada 
    if(result.rowCount>0  && bcrypt.compareSync(user.password , result.password)){
        const token= uuid()
        res.status(200).send({token})
    }
    res.sendStatus(401)
    
  
}