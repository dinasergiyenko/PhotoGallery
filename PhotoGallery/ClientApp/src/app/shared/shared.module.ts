import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomMaterialModule } from '@app/material/material.module';
import { DateFormatPipe } from '@app/shared/pipes/dateformat.pipe';
import * as fromComponents from '@app/shared/components/index';

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
