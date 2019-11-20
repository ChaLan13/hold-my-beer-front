import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeerComponent} from './beer/beer.component';
import {DrinksComponent} from './drinks/drinks.component';


const routes: Routes = [
  { path: '', component: DrinksComponent, pathMatch: 'full' },
  { path: 'drinks', component: DrinksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
