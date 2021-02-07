import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { StarRating } from './components/star-rating/star-rating.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FountainDisplayComponent } from './components/fountain-display/fountain-display.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    FountainDisplayComponent,
    StarRating
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
