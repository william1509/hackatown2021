import { Component, OnInit, Inject, Input } from '@angular/core';
import { stringify } from 'querystring';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { Fountain } from 'src/app/services/Fountain/fountain';
@Component({
  selector: 'app-fountain-display',
  templateUrl: './fountain-display.component.html',
  styleUrls: ['./fountain-display.component.css']
})
/* Inject data here. Import at line 3. */
export class FountainDisplayComponent implements OnInit {

  fountainName : string;
  starRating : number;
  numberRatings : number;
  userStars : number;
  fountainPicture: string;

  constructor(
    public dialogRef: MatDialogRef<FountainDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fountain
  ) {
  }
  ngOnInit(): void {
    this.fountainPicture = 'assets/placeholder.png';
    this.setFountain();
  }

  public setFountain() {
    this.fountainName = this.data.intersection;
    this.starRating = this.data.starRating;
    this.numberRatings = this.data.numberRatings;
  }

  public OpenDialog() {

  }

  public MakeRoute(): void {
    this.dialogRef.close({data: this.data});
  }

}
