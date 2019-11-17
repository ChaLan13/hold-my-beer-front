import { Component, OnInit } from '@angular/core';
import {BEERS} from '../_static/beers';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent {

  private readonly _beer: any;
  constructor() {
    this._beer = BEERS[0];
  }

  get beer(): any {
    return this._beer;
  }

}
