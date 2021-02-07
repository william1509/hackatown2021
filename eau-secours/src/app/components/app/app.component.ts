/// <reference types="@types/googlemaps" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Loader } from "@googlemaps/js-api-loader"
import { Fountain } from 'src/app/services/Fountain/fountain';
import { FountainService } from 'src/app/services/Fountain/fountain.service';
import { FountainDisplayComponent } from '../fountain-display/fountain-display.component';

const loader = new Loader({
  apiKey: "AIzaSyAfowCfopxwTeabNFPuv0av4Bwc0-az0r8",
  version: "weekly",
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;

  private fountainService: FountainService;
  private map: google.maps.Map;

  private fountain_id: number;
  public markerInfo: [google.maps.Marker, Fountain][];
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.markerInfo = new Array<[google.maps.Marker, Fountain]>();
    this.fountain_id = 0;
    this.fountainService = new FountainService();
    this.initMap();
    this.addMarker();
  }

  public addMarker(): void {
    loader.load().then(() => {
      this.fountainService.fountains.forEach(fountain => {
        let marker = new google.maps.Marker({
          position: { 
          lat: parseInt(fountain.latitude, 10), lng: parseInt(fountain.longitude, 10)},
          map: this.map,
          title: "Hello World!",
        });
        marker.addListener("click", () => {
          let dialogConfig = new MatDialogConfig();
          dialogConfig.maxWidth = 100;
          this.dialog.open(FountainDisplayComponent);
        this.markerInfo.push([marker, fountain]);
        });
      
      });
    });
  }

  public initMap(): void {
    loader.load().then(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: 45.59201175, lng: -73.58946238 },
        zoom: 8,
      });
    });
  }
}
