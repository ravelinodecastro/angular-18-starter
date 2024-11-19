import { BaseModel } from "src/app/shared/models/base.model";
import { CountryModel } from "./country.model";

export interface CountryCreateDto extends Omit<CountryModel, keyof BaseModel> {

}