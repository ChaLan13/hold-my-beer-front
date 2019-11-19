import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer} from '../interfaces/beer';
import {BeerService} from '../../services/beer.service';

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
  constructor(private service: BeerService) {
    this._beer = {} as Beer;
  }

  /**
   * Returns private property _beer
   */
  get beer(): Beer {
    return this._beer;
  }

  /**
   * Sets private property _person
   */
  @Input()
  set beer(beer: Beer) {
    this._beer = beer;
  }

  /**
   * Returns private property _delete$
   */
  @Output('delete') get delete$(): EventEmitter<Beer> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current person
   */
  delete(beer: Beer) {
    this.service.delete(beer.id);
  }

}
