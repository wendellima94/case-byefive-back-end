import express from 'express';

import { Login } from '../controller/LoginController';
import { NotificationIndex, NotificationUpdate } from '../controller/NotificationController';
import { 
  CreatePost,
  DeletePost,
  indexPost,
  PostLike,
  SearchPost,
  ShowPost
  } from '../controller/PostController';
import { CreateUser } from '../controller/UserController';
import LoginRequired from '../middlewares/LoginRequired';

export const router = express.Router();

//User Routes
router.post('/user', CreateUser);
router.post('/login', Login);

//Post Routes
router.get('/post', LoginRequired, indexPost);
router.get('/post/:id', ShowPost);
router.get('/posts/:username', SearchPost);
router.post('/post', LoginRequired, CreatePost);
router.delete('/post/:id', LoginRequired, DeletePost);

//Like Routes
router.post('/post/like/:id', LoginRequired, PostLike);

//Comments Routes

//Notification Routes
router.get('/notifications', LoginRequired, NotificationIndex);
router.put('/notifications/:id', LoginRequired, NotificationUpdate);

