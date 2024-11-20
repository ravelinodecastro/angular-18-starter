import { BaseModel } from "src/app/shared/models/base.model";

export interface CondominiumModel extends BaseModel {
    name: string;
    countryId: string;
}