import express, {Request, Response} from 'express';

import { login } from '../controller/LoginController';
import { PostController } from '../controller/PostController';
import { signUp } from '../controller/UserController';

export const router = express.Router();

router.post('/register', signUp)
router.post('/login', login)
router.post('/post', PostController)

