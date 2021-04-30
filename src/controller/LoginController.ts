import {Request, Response} from "express";

import * as bcrypt from "bcryptjs";
import UserModel from "../model/UserModel";
import { generateToken } from "../services/Authenticator";

export const Login = async (req: Request, res: Response) => {
  try {
  const { username, password } = req.body;

  const user: any = await UserModel.findOne({ username });

  if(!user) {
    return res.status(400).json({ errors: {general: 'Nome de usuário não existe'}});
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match){
    res.status(400).json({errors: { general: 'Senha incorreta'}});
  }

  console.log({ user });
  const token = generateToken(user);
  delete user.password;
  res.status(200).json({
    user: {
      ...user._doc,
      id: user._id,
    },
    token
  });
} catch (err) {
  console.log(err);
  res.status(404).json({
    errors: { message: 'Não foi possível logar'}
  })
  }
} 