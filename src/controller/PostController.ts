import { Request, Response } from 'express';
import moment from "moment";

import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import Post from '../model/Post';

const CreatePost = Post ;

export const PostController = async (req: Request, res: Response) => {
  try{
    const title = req.body.title;
    const description = req.body.description

    const authenticator = new Authenticator();
    const tokenData = authenticator.getData(req.headers.authorization! as string);

    if(!title || !description){
    throw new Error("invalid")
    }
  
    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    const today = moment().format('YYYY-MM-DD');

    await CreatePost.create({
      postId: id,
      title,
      description,
      today
    })
   
    res.status(200).send({
      message: "Post Criado",


    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
}