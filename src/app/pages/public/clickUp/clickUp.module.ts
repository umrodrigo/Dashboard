
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickUpComponent } from './clickUp.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ClickUpComponent }
];

@NgModule({
  declarations: [ClickUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbNavModule,
  ]
})
export class ClickUpModule { }
