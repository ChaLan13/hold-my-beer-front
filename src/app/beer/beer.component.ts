import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.less']
})
export class BeerComponent {

  private readonly nom: string;
  constructor() {
    this.nom = 'Charlotte';
  }

  get name(): string {
    return this.nom;
  }

}
