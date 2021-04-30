import { Request, Response } from 'express';
import NotificationModel from '../model/NotificationModel';

export const NotificationIndex = async (req: Request | any, res: Response) => {
  try {
    const { username } = req;

    const notifications: any = await NotificationModel.find({ username })
    
    if(notifications.length > 0 ){
      return res.status(200).json(notifications);
    }
    return res.json([])
  } catch (err) {
    console.log( err );
    res.status(404).json({
      errors: {
        message: 'Não foi possivel pegar as notificações'
      }
    })
  }
};

export const NotificationUpdate = async (req: Request | any, res: Response) => {
  try{
    const { username } = req;
    const { id } = req.params;

    const notification: any = await NotificationModel.findById(id);

    notification.wasRead = true;

    await notification.save();

    return res.status(200).json(notification);

  }catch (err) {
    console.log(err);
    res.status(404).json({
      errors: {
        message: 'Não foi possivel atualizar a notificação'
      }
    })
  }
}