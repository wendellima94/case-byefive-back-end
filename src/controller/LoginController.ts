import {Request, Response} from "express";

import jwt from 'jsonwebtoken'
import * as bcrypt from "bcryptjs";

import User, { IUser } from '../model/User'

const authConfig = require('../config/auth')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

export const login = async (req: Request, res: Response) => {
  
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email}).select('+password');

    if(!user)
    return  res.status(400).send({ message: 'Login incorrect'})

    if(!await bcrypt.compare(password, user.password))
    return  res.status(400).send({ message: 'Password incorrect'})
    
    res.send({
      user,
      token: generateToken({ id: user.id})
    })
}

    // const hashManager = new HashManager();
    // const isPasswordCorrect = await hashManager.compare(password, user.password);

    // if(!isPasswordCorrect) {
    //   throw new Error('Usuário ou senha errados');
    // }

//     res.status(200).send({
//       message: 'Usuário logado com sucesso'
//     })
//   } catch (e) {
//     res.status(400).send({
//       message: e.message
//     })
//   }
// };