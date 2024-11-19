import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { CountryModel } from '../models/country.model';
import { CountryCreateDto } from '../models/country-create.dto';
import { CountryUpdateDto } from '../models/country-update.dto';
import { CountryFilter } from '../models/country.filter';


@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService<CountryModel, CountryCreateDto, CountryUpdateDto, CountryFilter> {

  apiUrl = `${environment.apiUrl}/countries`;

}