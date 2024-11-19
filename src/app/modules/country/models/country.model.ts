import { BaseModel } from "src/app/shared/models/base.model";

export interface CountryModel extends BaseModel {
    name: string;
    code: string;
}