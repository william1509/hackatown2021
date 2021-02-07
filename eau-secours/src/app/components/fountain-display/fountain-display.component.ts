import { Component, OnInit, Inject, Input } from '@angular/core';
import { stringify } from 'querystring';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { Fountain } from 'src/app/services/Fountain/fountain';
import { HttpClient } from '@angular/common/http';
import { FountainService } from 'src/app/services/Fountain/fountain.service';

const pictureServer = "http://localhost:3000";

@Component({
  selector: 'app-fountain-display',
  templateUrl: './fountain-display.component.html',
  styleUrls: ['./fountain-display.component.css']
})
/* Inject data here. Import at line 3. */
export class FountainDisplayComponent implements OnInit {
  fountainName : string;
  fountainId: number;
  starRating : number;
  numberRatings : number;
  userStars : number;

  hasFountainPicture: boolean = false;
  fountainPicture: string = "assets/placeholder.png";

  constructor(
    public dialogRef: MatDialogRef<FountainDisplayComponent>,
    private fountainService: FountainService,
    @Inject(MAT_DIALOG_DATA) public data: Fountain
  ) {
  }

  ngOnInit(): void {
    this.setFountain();
    this.setFountainPicture();
  }

  public setFountain() {
    this.fountainName = this.data.park;
    this.fountainId = this.data.id;
    this.starRating = this.data.starRating;
    this.numberRatings = this.data.numberRatings;
  }

  public setFountainPicture() {
       let url = pictureServer + "/fountainPictures/" + this.fountainId + ".png";
       let img = new Image();
       img.src = url;
       
       // Hack to detect if image exists
       img.addEventListener("load", () => {
           if(img.height != 0) {
               this.hasFountainPicture = true;
               this.fountainPicture = url;console.log(url);
           } else {
               this.hasFountainPicture = false;
           }
       });
  }


  public OpenDialog() {

  }

  public MakeRoute(): void {
    this.dialogRef.close({data: this.data});
  }
  
  public onFileChanged(event) {
    let selectedFile: File = event.target.files[0];
    this.uploadPic(selectedFile);
  }

  public uploadPic(file: File) {
    if(file.type != "image/png") {
        alert("Error! Must be a .png file.");
        return false;
    }
    
    const uploadData = new FormData();
    uploadData.append('picture', file, this.fountainId + ".png");
    this.fountainService.uploadPicture(uploadData)
      .subscribe(() => {
        this.setFountainPicture();
      });
  }
}

