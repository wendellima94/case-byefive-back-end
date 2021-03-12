import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import User, { IUser } from '../model/User'

const authConfig = require('../config/auth')


function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

const UserRegister = User;

export const signUp = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      throw new Error('Insira todas as informações necessárias para o cadastro');
    }
    if(password.length < 6) {
      throw new Error('A senha deve conter no mínimo seis caracteres')
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    
    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    await UserRegister.create({
      id: id,
      name,
      email,
      password: hashPassword
    });
    
  

  res.status(200).send({
    message: 'Usuário criado com sucesso',
    token: generateToken({ id: UserRegister.findById})
  });

  }catch(e) {
    res.status(400).send({
      message: e.message
    })
  }
}
