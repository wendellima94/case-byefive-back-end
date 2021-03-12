import express, {Request, Response} from 'express';

import { login } from '../controller/LoginController';
import { signUp } from '../controller/UserController';

export const router = express.Router();

router.post('/register', signUp)
router.post('/login', login)


// (req: Request, res: Response) => {
//   const signup = UserRegister.create(req.body, (err: any) => {
//     if (err) return res.status(400).json({
//       error: true,
//       message: err.message,
//     });

//     return res.status(200).json({
//       error: false,
//       message: "Cadastrado com sucesso!"
//     })
//   });
// }

