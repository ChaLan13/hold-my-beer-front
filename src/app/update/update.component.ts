import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import {Beer} from '../shared/interfaces/beer';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: [ './update.component.css' ]
})
export class UpdateComponent implements OnInit {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store dialog reference
  private _beerDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _http: HttpClient, private _dialog: MatDialog) {
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
    this._route.params
      .pipe(
        map((params: any) => params.id),
        flatMap((id: string) => this._fetchOne(id))
      )
      .subscribe((beer: Beer) => {
        this._beerDialog = this._dialog.open(DialogComponent, {
          width: '500px',
          disableClose: true,
          data: beer
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._beerDialog.afterClosed()
          .pipe(
            filter(_ => !!_),
            flatMap(_ => this._update(_))
          )
          .subscribe(() => undefined, () => undefined, () => this._router.navigate([ '/beer' ]));
      });
  }

  /**
   * Update a person in the list
   */
  private _update(beer: Beer): Observable<Beer> {
    return this._http.put<Beer>(
      this._backendURL.oneBeer.replace(':id', beer.id),
     beer,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  /**
   * Returns an observable fetchs one person by id
   */
  private _fetchOne(id: string): Observable<Beer> {
    return this._http.get<Beer>(this._backendURL.oneBeer.replace(':id', id));
  }
}
