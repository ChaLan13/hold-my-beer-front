import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeerComponent} from './beer/beer.component';


const routes: Routes = [
  { path: '', component: BeerComponent, pathMatch: 'full' },
  { path: 'beer', component: BeerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
