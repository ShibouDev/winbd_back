import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
}
