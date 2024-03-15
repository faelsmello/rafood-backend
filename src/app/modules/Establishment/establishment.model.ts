import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IEstablishmentModel extends Document {
    name: string;
    type: number;
    phone: string;
    logo: string;
    briefDescription: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const establishmentSchema = new Schema<IEstablishmentModel>({
    name: { type: String, required: true, maxlength: 144 },
    type: { type: Number, required: true },
    phone: { type: String, required: true },
    logo: { type: String, default: null },
    briefDescription: { type: String, maxlength: 250 },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const EstablishmentModel: Model<IEstablishmentModel> = mongoose.model<IEstablishmentModel>('Establishment', establishmentSchema);
