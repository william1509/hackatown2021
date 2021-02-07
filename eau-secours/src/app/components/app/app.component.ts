import { Position } from '@angular/compiler';
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

  public markerInfo: [google.maps.Marker, Fountain][];


  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.markerInfo = new Array<[google.maps.Marker, Fountain]>();
    this.fountainService = new FountainService();
    this.initMap();
    this.addMarker();
  }

  public initMap(): void {
    loader.load().then(() => {
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsService = new google.maps.DirectionsService();
      this.map = new google.maps.Map(this.mapElement.nativeElement as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      })
      this.directionsRenderer.setMap(this.map);

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            this.map.setCenter(pos);
            
          },
          () => {
            console.log("Geolocation has failed");
          }, {
            enableHighAccuracy: true
          }
          )
      }
    });
  }

  public addMarker(): void {
    loader.load().then(() => {
      this.fountainService.fountains.forEach(fountain => {
        let icon = {
          url : '/assets/fountain_marker.png',
          scaledSize: new google.maps.Size(70,50),
        }
        let position = { 
          lat: parseFloat(fountain.latitude), lng: parseFloat(fountain.longitude)
        };
        let marker = new google.maps.Marker({
          position: position,
          map: this.map,
          icon: icon,
          title: "Hello World!",
        });
        this.markerInfo.push([marker, fountain]);
        marker.addListener("click", () => {
          
          const dialogRef = this.dialog.open(FountainDisplayComponent, {
            data: fountain
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
  public StartRoute(foutain: Fountain): void {
    const destination = {
      lat: parseFloat(foutain.latitude),
      lng: parseFloat(foutain.longitude)
    }; 
    loader.load().then(() => {
    
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            this.map.setCenter(pos);
            let request = 
            {
              origin: { lat: pos.lat, lng: pos.lng },
              destination: { lat: destination.lat, lng:destination.lng },
              travelMode: google.maps.TravelMode.WALKING
            };
            this.directionsService.route(request, (result, status) => {
              if (status == 'OK') {
                this.directionsRenderer.setDirections(result);
              }
            });
          },
          () => {
            console.log("Geolocation has failed");
          }, {
            enableHighAccuracy: true
          }
        )
      }

    
  });
  }
}
