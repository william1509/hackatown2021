import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loader } from "@googlemaps/js-api-loader"
import {} from 'googlemaps';
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
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;


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
        let position = { 
          lat: parseInt(fountain.latitude, 10), lng: parseInt(fountain.longitude, 10)
        };
        let marker = new google.maps.Marker({
          position: position,
          map: this.map,
          title: "Hello World!",
        });
        this.markerInfo.push([marker, fountain]);
        marker.addListener("click", () => {
          const dialogRef = this.dialog.open(FountainDisplayComponent, {
            data: position
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              this.StartRoute(result.data);
            }
          })
        });

      
      });
    });
  }

  public initMap(): void {
    loader.load().then(() => {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsService = new google.maps.DirectionsService();
      
      this.map = new google.maps.Map(this.mapElement.nativeElement as HTMLElement, {
        center: { lat: 45.59201175, lng: -73.58946238 },
        zoom: 8,
      });
      this.directionsRenderer.setMap(this.map);
      
    });
  }

  public StartRoute(dest: [number, number]): void {
    
    loader.load().then(() => {
      
    let request = 
    {
      origin: { lat: 46, lng: -73.59 },
      destination: { lat: 45.59201175, lng: -73.58946238 },
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  });
  }
}
