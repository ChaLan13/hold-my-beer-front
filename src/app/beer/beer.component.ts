import { Component, OnInit } from '@angular/core';
//import {BEERS} from '../_static/beers';
import {merge, Observable} from 'rxjs';
import {Beer} from '../shared/interfaces/beer';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {defaultIfEmpty, filter, flatMap, tap} from 'rxjs/operators';
import {BeerService} from '../services/beer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent implements OnInit {
  private _beer: any;
  private readonly _backendURL: any;
  private _isBeer: boolean;


  constructor(private _beerService: BeerService, private _route: ActivatedRoute) {
    this._beer = {} as Beer;
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        flatMap(params => this._beerService.fetchOne(params.id)),
        tap(_ => this._isBeer = true)
      ),
      this._route.params.pipe(
        filter(params => !params.id),
        flatMap(_ => this._beerService.fetchRandom()),
        tap()
      )
    )
      .subscribe((beer: any) => this._beer = beer);
  }

  get isBeer(): boolean {
    return this._isBeer;
  }

  set isBeer(value: boolean) {
    this._isBeer = value;
  }

  get beer(): any {
    return this._beer;
  }

  random() {
    console.log('beer.component.ts envoi vers beer.service');
    this._beerService
      .fetchRandom()
      .subscribe((beer: Beer) => this._beer = beer);
  }


}
