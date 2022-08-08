import db from "../postgressStrategy/pg.js"
import { nanoid } from "nanoid";



//urls : id , userId, shortUrl ,url , visitCount

export async function shortLink(req,res){
    const {resultUser} = res.locals;
    const {url}= req.body
   
  
    const NUM_OF_CHARS = 10;
    const shortURL = nanoid(NUM_OF_CHARS);
    const visit="0"
    console.log(shortURL)

    await db.query(`
    INSERT INTO urls ("userId","shortUrl",url,"visitCount") 
    VALUES ($1, $2, $3 , $4)
`, [resultUser.rows[0].id, shortURL, url, visit ])



res.send({shortURL}).status(200)

}

export async function getLinkById(req,res){
    const {id}= req.params

    const result= await db.query(` SELECT * FROM urls WHERE id=$1  `, [id])
    if(result.rowCount==0) return res.sendStatus(404)

    const [link]= result.rows
    console.log(link)

    delete link.userId;
    delete link.visitCount;

    res.send(link).status(200)
    

}

export async function openLink(req,res){
    const {shortUrl}= req.params

    const result = await db.query(` SELECT * FROM urls WHERE "shortUrl"=$1`,[shortUrl])

    if(result.rowCount==0) return res.sendStatus(404)

     await db.query(`
          UPDATE urls
          SET "visitCount" = "visitCount" + 1
          WHERE id = $1`, 
          [result.rows[0].id]);
          console.log(result)
     
    res.redirect(result.rows[0].url)
      
}

export async function deleteUrlById(req,res){
    const {resultUser} = res.locals;
    const {id}= req.params;

    const result= await db.query(`
    SELECT * FROM urls WHERE "userId"=$1
    ` ,[resultUser.rows[0].id])
 console.log(result.rows)
   

  const urlExist= await db.query(`
  SELECT * FROM urls WHERE id=$1
  
  ` , [id])

  if(urlExist.rowCount==0) return res.sendStatus(404)

  if(urlExist.rows[0].userId!== resultUser.rows[0].id)return res.sendStatus(401)




 await db.query(`
 DELETE FROM urls WHERE id=$1
 
 `, [id])
    
 res.sendStatus(204);

}