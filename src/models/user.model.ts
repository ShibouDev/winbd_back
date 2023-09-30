import * as bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';

import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
  hashPassword(): void;
}

export interface IUserModel extends Model<IUser> {}

export const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.method('comparePassword', function (password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true;
  return false;
});

userSchema.method('hashPassword', function () {
  this.password = bcrypt.hashSync(this.password);
});

userSchema.index({ email: 1 }, { unique: true });

export const UserModel: IUserModel = model<IUser, IUserModel>(
  'User',
  userSchema,
);
