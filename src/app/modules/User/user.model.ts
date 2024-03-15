import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUserModel extends Document {
    name: string;
    password: string;
    email: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUserModel>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);
