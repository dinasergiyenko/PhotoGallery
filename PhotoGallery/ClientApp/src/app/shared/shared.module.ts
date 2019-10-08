import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/dateformat.pipe';
import { RouterModule } from '@angular/router';

import * as fromComponents from './components/index';

@NgModule({
  declarations: [
    [...fromComponents.components],
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    RouterModule
  ],
  providers: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    DateFormatPipe,
    [...fromComponents.components]
  ]
})

export class SharedModule { }
