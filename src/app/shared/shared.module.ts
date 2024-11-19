import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { BaseListComponent } from './components/base-list/base-list.component';


@NgModule({
  declarations: [
    BaseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableModule,
    NgxCustomModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    NgxCustomModalComponent,
    BaseListComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
        ngModule: SharedModule,
        providers: [
        ],
    };
}
 }
