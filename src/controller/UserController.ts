import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import UserModel from "../model/UserModel";
import { generateToken } from "../services/Authenticator";


// const generateToken = (user: any) => {
//   return jwt.sign({
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     username: user.username,
//     friends: user.friends,
//   },
//     process.env.TOKEN_SECRET || '',
//     { expiresIn: process.env.TOKEN_EXPIRES_IN || '1h'}
//   );
// };

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, confirmPassword } = req.body;

    const usernameInUse = await UserModel.findOne({ username });
    if(usernameInUse) {
      return res.status(400).json({
        errors: {
          username: 'Nome de usuário já existe'
        },
      });
    }

    const emailInUse = await UserModel.findOne({ email });
    if(emailInUse) {
      return res.status(400).json({
        errors: {
          email: 'Email já em uso'
        },
      });
    }
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        name,
        email,
        username,
        password: passwordHash,
      });

      const result: any = await newUser.save();

      const token = generateToken(result);

      return res.status(200).json({
        ...result._doc,
        id: result._id,
        token
      });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      errors: {
        message: 'Não foi possivel criar o usuário'
      }
    })
  }
}

export const ShowUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });

    if(!user ) {
      return res.status(400).json({ errors: { user: 'Esse usuário não existe'}});
    }

    return res.status(200).json(user);
}

export const IndexUser = async (req: Request | any, res: Response) => {
  const { username } = req;
  const usernameRegexp = new RegExp('^', req.params.username);
  const users: any = await UserModel.find({ username: usernameRegexp });

  if(users.length > 0 ) {
    const filtredUsers = users.filter(
      (user: any) => user.username !== username
    );

    return res.json(filtredUsers);
  } else {
    return res.json([])
  }



} 

// }
// const UserRegister = UserModel;

// export const signUp = async (req: Request, res: Response) => {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     if (!name || !email || !password) {
//       throw new Error('Insira todas as informações necessárias para o cadastro');
//     }
//     if(password.length < 6) {
//       throw new Error('A senha deve conter no mínimo seis caracteres')
//     }

//     const idGenerator = new IdGenerator();
//     const id = idGenerator.generateId();
    
//     const hashManager = new HashManager();
//     const hashPassword = await hashManager.hash(password);

    
//     const authenticator = new Authenticator();
//     const token = authenticator.generateToken({
//       id,
//     });
//     await UserRegister.create({
//       id: id,
//       name,
//       email,
//       password: hashPassword
//     });
    
//     res.status(200).send({
//     message: 'Usuário criado com sucesso',
//     token
//     });

//   } catch(e) {
//     res.status(400).send({
//       message: e.message
//     })
//   }
// }
