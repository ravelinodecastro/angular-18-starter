import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { CountryListComponent } from './components/country-list/country-list.component';


const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    title: 'Country'
  }
];
@NgModule({
  declarations: [CountryListComponent, CountryFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule.forRoot()],
})
export class CountryModule { }
