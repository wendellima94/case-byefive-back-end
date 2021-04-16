import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IPosts extends Document {
  postId: string,
  title: string,
  description: string
}

const PostSchema = new Schema ({
  postId: {
    type: String, 
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  }
},
{
  timestamps: true,
})

export default mongoose.model<IPosts>('Post', PostSchema);
