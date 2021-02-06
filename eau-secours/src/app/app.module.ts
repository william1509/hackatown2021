import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FountainDisplayComponent } from './components/fountain-display/fountain-display.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FountainPopupComponent } from './components/fountain-popup/fountain-popup.component'; 

@NgModule({
  declarations: [
    AppComponent,
    FountainDisplayComponent,
    FountainPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
