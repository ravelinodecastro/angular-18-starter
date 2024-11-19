import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CountryModel } from '../../models/country.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';
import { CountryCreateDto } from '../../models/country-create.dto';
import { CountryUpdateDto } from '../../models/country-update.dto';
import { ModelFormGroup } from 'src/app/shared/forms/model-form-group';
import { CountryService } from '../../services/country.service';
import { StrictFormBuilder } from 'src/app/shared/forms/strict-form-builder';
import { CountryFilter } from '../../models/country.filter';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: []
})
export class CountryFormComponent extends BaseFormComponent<CountryModel, CountryCreateDto, CountryUpdateDto, CountryFilter> implements OnInit {

  @Input() override model?: CountryModel;

  override form!: ModelFormGroup<CountryCreateDto>;

  constructor(private fb: StrictFormBuilder, private countryService: CountryService) {
    super(countryService)
  }

  get nameError(): string {
    return this.getFieldError('name');
  }

  get codeError(): string {
    return this.getFieldError('code');
  }

  initForm(model?: CountryModel) {
    this.form = this.fb.group<CountryCreateDto>({
      name: [model?.name ?? '', Validators.required],
      code: [model?.code ?? '', Validators.required]
    });
    super.activateReadOnlyForm();
  }


}
