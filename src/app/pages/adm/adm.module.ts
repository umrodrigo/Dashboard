import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AdmComponent } from './adm.component';
import { AdmRoutingModule } from './adm-routing.module';
import { AdmToolbarComponent } from 'src/app/components/adm-toolbar/adm-toolbar.component';

@NgModule({
  declarations: [AdmComponent],
  imports: [
    CommonModule,
    AdmRoutingModule,
    MatTabsModule,
    NgbCarouselModule,
  ],
})
export class AdmModule { }
