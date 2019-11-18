import {MatCardModule, MatIconModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerComponent } from './beer/beer.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CardComponent } from './shared/card/card.component';
import {DialogComponent} from './shared/dialog/dialog.component';
import {UpdateComponent} from '../update/update.component';
import {FormComponent} from '../form/form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {DrinksComponent} from './drinks/drinks.component';



@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    CardComponent,
    DialogComponent,
    UpdateComponent,
    FormComponent,
    DrinksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
