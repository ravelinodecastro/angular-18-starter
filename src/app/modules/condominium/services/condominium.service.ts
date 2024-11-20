import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { CondominiumModel } from '../models/condominium.model';
import { CondominiumCreateDto } from '../models/condominium-create.dto';
import { CondominiumUpdateDto } from '../models/condominium-update.dto';
import { CondominiumFilter } from '../models/condominium.filter';


@Injectable({
  providedIn: 'root'
})
export class CondominiumService extends BaseService<CondominiumModel, CondominiumCreateDto, CondominiumUpdateDto, CondominiumFilter> {

  apiUrl = `${environment.apiUrl}/countries`;

}