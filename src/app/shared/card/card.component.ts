import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer} from '../interfaces/beer';
import {BeerService} from '../../services/beer.service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // private property to store person value
  private _beer: Beer;
  // private property to store delete$ value

  /**
   * Component constructor
   */
  constructor(private service: BeerService, private router: Router) {
    this._beer = {} as Beer;
  }

  /**
   * Returns private property _beer
   */
  get beer(): Beer {
    return this._beer;
  }

  /**
   * Sets private property _beer
   */
  @Input()
  set beer(beer: Beer) {
    this._beer = beer;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to delete current beer
   */
  delete(beer: Beer): Observable<any> {
    console.log('card.component envoie au service');
    console.log('id: ', beer.id);
    return this.service.delete(beer.id);
  }

}
