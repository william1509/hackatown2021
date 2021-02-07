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

  fountainPicture : string;

  constructor(
    public dialogRef: MatDialogRef<FountainDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [number, number]
  ) {
    this.data[0];
  }

  ngOnInit(): void {
    this.fountainPicture = 'assets/placeholder.png'
  
  }

  public setFountain(fountain: Fountain) {
    this.fountainName = fountain.intersection;
    this.starRating = 5;
    this.userStars = 5;
    this.numberRatings = 1000;
  }

<<<<<<< HEAD
  public MakeRoute(): void {
    this.dialogRef.close({data: this.data});
  }

=======
  onFileChanged(event) {
    let selectedFile: File = event.target.files[0];
    this.uploadPic(selectedFile);
  }

  uploadPic(file: File) {
    console.log(file);
  }
>>>>>>> fountain-upload-pic
}

