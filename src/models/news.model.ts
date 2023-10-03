import { Model, Schema, model } from 'mongoose';

import { INewsDocument } from '../interfaces';

export interface IUserModel extends Model<INewsDocument> {}

export const newsSchema: Schema<INewsDocument> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    rawText: { type: String, required: true },
    publicTime: { type: Date },
    publish: {type: Boolean, required: true}
  },
  {
    timestamps: true,
  },
);

newsSchema.index({ user: 1 });

export const NewsModel: IUserModel = model<{}, IUserModel>(
  'News',
  newsSchema,
);
