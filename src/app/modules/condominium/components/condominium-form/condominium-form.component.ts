import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CondominiumModel } from '../../models/condominium.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';
import { CondominiumCreateDto } from '../../models/condominium-create.dto';
import { CondominiumUpdateDto } from '../../models/condominium-update.dto';
import { ModelFormGroup } from 'src/app/shared/forms/model-form-group';
import { CondominiumService } from '../../services/condominium.service';
import { StrictFormBuilder } from 'src/app/shared/forms/strict-form-builder';
import { CondominiumFilter } from '../../models/condominium.filter';
import { CountryService } from 'src/app/modules/country/services/country.service';
import { CountryModel } from 'src/app/modules/country/models/country.model';
import { DropdownService, SearchableDropdown } from 'src/app/shared/services/dropdown.service';
import { setBackendError } from 'src/app/shared/utils/error.util';

@Component({
  selector: 'app-condominium-form',
  templateUrl: './condominium-form.component.html',
  styleUrls: []
})
export class CondominiumFormComponent extends BaseFormComponent<CondominiumModel, CondominiumCreateDto, CondominiumUpdateDto, CondominiumFilter> implements OnInit {

  @Input() override model?: CondominiumModel;

  override form!: ModelFormGroup<CondominiumCreateDto>;

  countryDropdown!: SearchableDropdown<CountryModel>;

  constructor(private fb: StrictFormBuilder, 
    private condominiumService: CondominiumService,
     private countryService: CountryService,
    private dropdownService: DropdownService) {
    super(condominiumService)
  }

  override ngOnInit(): void {
    this.initForm(this.model);
    this.initDropdowns();
    super.ngOnInit();
  }

  private initDropdowns(): void {

    this.countryDropdown = this.dropdownService.createDropdownModel<CountryModel>(
      (search: string, page: number) => this.countryService.findAll({ search, page, size: 10, sort: [] }),
      error => {
        setBackendError(this.form.get('countryId')!, 'Falha');
      }
    );
  }

  initForm(model?: CondominiumModel) {
    this.form = this.fb.group<CondominiumCreateDto>({
      name: [model?.name ?? '', Validators.required],
      countryId: [model?.countryId ?? '', Validators.required]
    });
    super.activateReadOnlyForm();
  }

  get nameError(): string {
    return this.getFieldError('name');
  }

  get countryIdError(): string {
    return this.getFieldError('countryId');
  }




}
