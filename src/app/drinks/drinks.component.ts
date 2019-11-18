import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';
import {Beer} from '../shared/interfaces/beer';
import {BeerService} from '../services/beer.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: [ './drinks.component.css' ]
})
export class DrinksComponent implements OnInit {
  // private property to store drinks value
  private _drinks: Beer[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _drinksDialog: MatDialogRef<DialogComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _beerService: BeerService, private _dialog: MatDialog) {
    this._drinks = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _drinks
   */
  get drinks(): Beer[] {
    return this._drinks;
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Returns private property _view
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._beerService
      .fetch().subscribe((drinks: Beer[]) => this._drinks = drinks);
  }

  /**
   * Function to delete one beer
   */
  delete(beer: Beer) {
    this._beerService
      .delete(beer.id)
      .subscribe(_ => this._drinks = this._drinks.filter(__ => __.id !== _));
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._drinksDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._drinksDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (drinks: Beer[]) => this._drinks = drinks,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Function to switch view
   */
  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }

  /**
   * Function to navigate to current person
   */
  navigate(beer: Beer) {
    this._router.navigate([ '/beer', beer.id ]);
  }

  /**
   * Add new person and fetch all drinks to refresh the list
   */
  private _add(beer: Beer): Observable<Beer[]> {
    return this._beerService
      .create(beer)
      .pipe(
        flatMap(_ => this._beerService.fetch())
      );
  }
}
