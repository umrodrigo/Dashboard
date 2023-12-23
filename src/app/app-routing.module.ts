import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLayoutComponent } from './layouts/common/common-layout/common-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'clickUp', pathMatch: 'full' },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: 'clickUp', loadChildren: () => import('./pages/public/clickUp/clickUp.module').then(m => m.ClickUpModule)},
     ],
  },
  { path: '**', redirectTo: 'clickUp' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

