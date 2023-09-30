import { Document, Schema } from 'mongoose';

export interface IUserTokenDocument extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
  updateAt: Date;
}
