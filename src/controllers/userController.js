import db from "../postgressStrategy/pg.js"
import {v4 as uuid} from "uuid"
import bcrypt from 'bcrypt';


//users : id , name , email , password 
//sessions : id , userId , token

export async function signUp(req,res){
   const user = req.body
  

   try {

    const result= await db.query(`SELECT name FROM users  WHERE email=$1` , [user.email])

 
    
    if(result.rowCount>0){
        return res.send("Usuario ja cadastrado, entre").status(509)
    }
    if(user.password!== user.confirmPassword){
        return res.send("As senhas nao coincidem").status(401)
    }
   
    const passwordCripted = bcrypt.hashSync(user.password , 10);
    
    await db.query(`
            INSERT INTO users (name , email , password) 
            VALUES ($1, $2, $3)
        `, [user.name, user.email, passwordCripted])

        res.send("Usuario cadastrado com sucesso").status(200)
   } catch (error) {
    
  
    res.sendStatus(500)
   }

}

export async function signIn(req,res){
    const user = req.body

    const result= await db.query(`SELECT * FROM users  WHERE email=$1` , [user.email])
    console.log(result)
    if(result.rowCount==0) return res.sendStatus(401)

    const newPass=bcrypt.compareSync(user.password , result.rows[0].password)

    if(!newPass) return res.sendStatus(401)
   

   
  
    const token= uuid()
    await db.query(`
    
   INSERT INTO sessions ("userId" , token)
   VALUES($1,$2) `,[result.rows[0].id , token])
  
   res.sendStatus(200)
}

export async function getInfo(req,res){
    const {resultUser} = res.locals;
    const [user]= resultUser.rows
    if(!user) return res.send(404);
   


    const resultInfoUser = await db.query(`
    SELECT us.id, us.name , SUM(ur."visitCount") as "vistiCount"  
    FROM users us
    JOIN urls ur ON ur."userId"=us.id
    GROUP BY us.id
    ` , )

    const [info]= resultInfoUser.rows
  
    const resultUrls = await db.query(`
    SELECT * FROM urls WHERE "userId"=$1
    ` ,[resultUser.rows[0].id])  
    console.log(resultUser.rows[0].id)
  
    const todas = await db.query(`
    SELECT * FROM urls 
    ` )  
    console.log(todas)
const shortenedUrls= resultUrls.rows
console.log(shortenedUrls)
shortenedUrls.map(item => item.userId == resultUser.rows[0].id)

res.send({...info , shortenedUrls}).status(200)

}

export async function getRanking(req,res){

    const infoUser=await db.query(`
    SELECT us.id , us.name , COUNT(ur.id) as "linksCount" , SUM(ur."visitCount") as "visitCount"
    FROM users us 
    JOIN urls ur ON ur."userId"=us.id
    GROUP BY us.id
    ORDER BY "linksCount" DESC
    LIMIT 10
    `)
    
res.send(infoUser.rows)

}
