import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser extends Document {
  id: string
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{
  timestamps: true,
})

export default mongoose.model<IUser>('User', UserSchema);

