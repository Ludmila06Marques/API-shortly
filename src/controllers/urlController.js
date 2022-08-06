import db from "../postgressStrategy/pg.js"
import { nanoid } from "nanoid";

//urls : id , userId, shortUrl ,url , visitCount

export async function shortLink(req,res){
    const {resultUser} = res.locals;
    const link= req.body
    console.log(link)
  
    const NUM_OF_CHARS = 10;
    const shortURL = nanoid(NUM_OF_CHARS);
    const visit="0"
    console.log(shortURL)

    await db.query(`
    INSERT INTO urls ("userId","shortUrl",url,"visitCount") 
    VALUES ($1, $2, $3 , $4)
`, [resultUser.rows[0].id, shortURL, link, visit ])

res.send({shortURL}).status(200)

}