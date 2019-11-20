import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer} from '../interfaces/beer';
import {BeerService} from '../../services/beer.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // private property to store person value
  private _beer: Beer;
  // private property to store delete$ value
  private _delete$: EventEmitter<Beer>;

  /**
   * Component constructor
   */
  constructor(private service: BeerService, private router: Router) {
    this._beer = {} as Beer;
    this._delete$ = new EventEmitter<Beer>();
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

  @Output('deleteBeer')
  get delete$(): EventEmitter<Beer> {
    return this._delete$;
  }


  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to delete current beer
   */
  delete(beer: Beer) {
    this._delete$.emit(beer);
  }
}
