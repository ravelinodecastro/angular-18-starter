import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CondominiumFormComponent } from './components/condominium-form/condominium-form.component';
import { CondominiumListComponent } from './components/condominium-list/condominium-list.component';


const routes: Routes = [
  {
    path: '',
    component: CondominiumListComponent,
    title: 'Condominium'
  }
];
@NgModule({
  declarations: [CondominiumListComponent, CondominiumFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule.forRoot()],
})
export class CondominiumModule { }
