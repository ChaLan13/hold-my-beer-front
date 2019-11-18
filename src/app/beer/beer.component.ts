import { Component, OnInit } from '@angular/core';
import {BEERS} from '../_static/beers';
import {Observable} from 'rxjs';
import {Beer} from '../shared/interfaces/beer';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {defaultIfEmpty, filter, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent {

  private _beer: any;
  private readonly _backendURL: any;


  constructor(private _http: HttpClient) {
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

  get beer(): any {
    return this._beer;
  }

  random() {
    this._beer = BEERS[ Math.round(Math.random() * BEERS.length) ];
  }

  delete(beer: Beer) {
    this._http.delete(this._backendURL.oneBeer.replace(':id', beer.id)).subscribe(_ => this._beer = this._beer( _ => _.id !== beer.id));
  }

  private create(beer: Beer): Observable<Beer[]> {
    return this._http.post(this._backendURL.allBeers, beer, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(flatMap( _ => this._getAll()));
  }

  private _getAll(): Observable<Beer[]> {
    return this._http.get(this._backendURL.allBeer)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }


}
