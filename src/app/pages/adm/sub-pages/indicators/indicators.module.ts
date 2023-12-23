import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IndicatorsComponent } from './indicators.component';

const routes: Routes = [
  { path: '', component: IndicatorsComponent }
];

@NgModule({
  declarations: [IndicatorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class IndicatorsModule { }
