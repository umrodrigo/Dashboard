
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickUpComponent } from './clickUp.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbNavModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: ClickUpComponent }
];

@NgModule({
  declarations: [ClickUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbNavModule,
    NgbAccordionModule,
  ]
})
export class ClickUpModule { }
