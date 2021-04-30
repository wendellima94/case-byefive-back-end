import {Request, Response, NextFunction, response} from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel';

export default async (req: Request | any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(400).json({
      errors: {
        general: 
          'É preciso fazer o login'
      }
    });
  }

  const [ token ] = authorization.split(" ");

  try {
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET || "")
    const { id, name, email, username, friends } = data;

    const user = await UserModel.findOne({
      username,
    })

    if(!user) {
      return response.status(401).json({
        errors: {
          username: 'Usuário inválido'
        }
      });
    }

      req.id = id;
      req.name = name;
      req.email = email;
      req.username = username;
      req.friends = friends;
      return next();
    
  } catch (err) {
    return res.status(401).json({
      errors: {
        invalid_token: 'Token expirado ou inválido'
      }
    });
  }
};