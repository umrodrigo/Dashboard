import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm.component';

const routes: Routes = [
  { path: '', component: AdmComponent },
  { path: 'indicadores', loadChildren: () => import('./sub-pages/indicators/indicators.module').then(m => m.IndicatorsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
