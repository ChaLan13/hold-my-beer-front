import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _intro = 'todo';
  private _view = 'oneBeer';
  title = 'HoldMyBeer';
  private items: NbMenuItem[];

  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._matIconRegistry.addSvgIcon('icon-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-delete.svg'));
    this._matIconRegistry.addSvgIcon('icon-edit', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-edit.svg'));
  }

  get view() {
    return this._view;
  }

  /**
   * Function to switch view
   */
  switchView() {
    this._view = (this._view === 'oneBeer') ? 'beerList' : 'oneBeer';
  }

  get intro() {
    return this._intro;
  }

  introIsDone() {
    this._intro = 'done';
  }
}
