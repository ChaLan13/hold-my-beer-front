import { Component, OnInit } from '@angular/core';
import {BEERS} from '../_static/beers';
import {Observable} from "rxjs";

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent {

  private _beer: any;
  constructor() {
    this._beer = {} as Beer;
  }

  get beer(): any {
    return this._beer;
  }

  random() {
    this._beer = BEERS[ Math.round(Math.random() * BEERS.length) ];
  }

  delete(beer: Beer){
    this._http.delete(this._backendURL.oneBeer.replace(':id', beer.id)).subscribe(_ => this._beer = this._beer(_ => _.id !== beer.id));
  }

}
