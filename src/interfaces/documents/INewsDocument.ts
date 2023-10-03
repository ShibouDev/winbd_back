import { Document, Schema } from 'mongoose';

export interface INewsDocument extends Document {
  user: Schema.Types.ObjectId;
  rawText: string;
  publicTime?: Date;
  publish: boolean;
}
