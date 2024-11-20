import { BaseModel } from "src/app/shared/models/base.model";
import { CondominiumModel } from "./condominium.model";

export interface CondominiumCreateDto extends Omit<CondominiumModel, keyof BaseModel> {

}