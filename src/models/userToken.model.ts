import { Model, Schema, model } from 'mongoose';
import { IUserTokenDocument } from '../interfaces/IUserTokenDocument';

interface IUserTokenModel extends Model<IUserTokenDocument> {}

const userTokenSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserTokenModel = model<{}, IUserTokenModel>(
  'refreshToken',
  userTokenSchema,
);
