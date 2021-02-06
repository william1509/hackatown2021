import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FountainDisplayComponent } from '../fountain-display/fountain-display.component';

@Component({
  selector: 'app-fountain-popup',
  templateUrl: './fountain-popup.component.html',
  styleUrls: ['./fountain-popup.component.css']
})
export class FountainPopupComponent implements OnInit {

  constructor(public dialog : MatDialog) { }
  openDialog(){
    const dialogRef = this.dialog.open(FountainDisplayComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }
}
