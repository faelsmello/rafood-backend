import { Model } from 'mongoose';
import { EstablishmentModel, IEstablishmentModel } from './establishment.model';

class EstablishmentService {
    private establishmentModel: Model<IEstablishmentModel>;

    constructor() {
        this.establishmentModel = EstablishmentModel;
    }

    public async createEstablishment(establishmentBody: Partial<IEstablishmentModel>): Promise<IEstablishmentModel> {
        const establishment = new this.establishmentModel(establishmentBody);
        return await establishment.save();
    }
}

export default EstablishmentService;
