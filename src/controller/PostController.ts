import { Request, response, Response } from 'express';

import PostModel from '../model/PostModel';
import UserModel from '../model/UserModel';
import NotificationModel from '../model/NotificationModel';

export const indexPost = async (req: Request | any, res: Response) => {
  try{
    const { username } = req;

      const user: any = await UserModel.findOne({ username });

      if (!user) {
        return res.status(400).json({
          errors: { general: "Usuário não existe" },
        });
      }

      const friendsUsernames = user.friends.map((friend: any) => {
        return friend.username;
      });

      friendsUsernames.push(username);

      console.log({ friendsUsernames });

      const posts = await PostModel.find({
        username: { $in: friendsUsernames },
      });

      console.log(posts);

      res.json(posts);
    } catch (e) {
      res.status(404).json({ 
        errors: { 
          message: "Não foi possível listar os posts" 
        } 
      });
    }
  }

export const ShowPost = async (req: Request | any, res: Response) => {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id);

      if(!post) {
        res.status(400).json({
          errors : {
            general: 'Post não existe'
          }
        })
      }
      res.json(post);
    } catch (err ) {
      res.status(404).json({
        message: 'Não foi possível pegar o post'
      })
    }
  }

export const SearchPost = async (req: Request | any, res: Response) => {
    try {
      const { username } = req.params;
      const posts = await PostModel.find({
        username,
      })

      return res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({
        errors: {
          message: 'Não foi possível listar os posts'
        }
      })
    }
  }

export const CreatePost = async (req: Request | any, res: Response) => {
  try{
    const { id, username } = req;
    const { caption } = req.body;

    const newPost = new PostModel({
      user: id, 
      username,
      caption: caption !== undefined
      ? {
        body: caption,
      }
      : {},
    });

    const post = await newPost.save();
    req.io.emit('post-created', { post });

    res.status(200).json({
      post
    });
  } catch (err) {
    res.status(404).json({
      errors: {
        message: 'Não foi possivel postar'
      }
    })
  }
}

export const DeletePost = async (req: Request | any, res: Response) => {
  try {
    const { username } = req;
    const { id: postId} = req.params;

    const post: any = await PostModel.findById(postId);

    if(!post) {
      return res.status(400).json({
        errors: {
          general: 'Post não existe'
        }
      }) 
    }

    if( username === post.username ) {
      await post.delete();

      req.io.emit('post-deleted', { post });

      return res.status(200).json({
        message: 'Post deletado com sucesso'
      })
    } else {
      return res.status(400).json({
        errors: {
          general: 'Ação não permitida'
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      errors: {
        message: 'Não foi possivel deletar o post'
      }
    })
  }
}

export const PostLike = async (req: Request | any, res: Response) => {
  try {
    const { username, name } = req;
    const { id: postId } = req.params;
    
    const post: any = await PostModel.findById(postId);

    if(post) {
      if(post.likes.find((like: any) => like.username === username)) {
        post.likes = post.likes.filter(
          (like: any) => like.username !== username
        )
      } else {
        post.likes.push({
          username,
        });

        const notification = await NotificationModel.findOne({
          username: post.username,
          postId,
          notificationType: 'like',
        });

        if(!notification) {
          if (post.username !== username){
            const newNotification = new NotificationModel({
              username: post.username,
              postId,
              body: `${name} curtiu sua postagem!`,
              notificationType: 'like'
            });

            const notification = await newNotification.save();
            req.io.emit('notification', { notification })
          }
        }
      }

      await post.save();
      req.io.emit('liked-post', { post });

      return res.status(200).json({
        message: 'Ação realizada com sucesso'
      });  
    } else {
      return res.status(400).json({
        errors: {
          general: 'Post não existe'
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errors: {
        message: 'Não foi possivel realizar a ação'
      }
    })
  }
}