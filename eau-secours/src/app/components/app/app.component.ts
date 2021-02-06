import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import {} from 'googlemaps';
import { Fountain } from 'src/app/services/Fountain/fountain';
import { FountainService } from 'src/app/services/Fountain/fountain.service';

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

  @ViewChild('legend') legend: ElementRef;
  @ViewChild('map') mapElement: ElementRef;

  private fountainService: FountainService;
  private map: google.maps.Map;

  private fountain_id: number;
  private markerInfo: [google.maps.Marker, Fountain][];

  ngOnInit() {
    this.markerInfo = new Array<[google.maps.Marker, Fountain]>();
    this.fountain_id = 0;
    this.fountainService = new FountainService();
    this.initMap();
    this.addMarker();
  }

  public addMarker(): void {
    loader.load().then(() => {
      const infowindow = new google.maps.InfoWindow({
        content: (this.legend.nativeElement as HTMLElement).outerHTML,
      });
    
      this.fountainService.fountains.forEach(fountain => {
        let marker = new google.maps.Marker({
          position: { 
          lat: parseInt(fountain.latitude, 10), lng: parseInt(fountain.longitude, 10)},
          map: this.map,
          title: "Hello World!",
        });
        marker.addListener("click", () => {
          console.log(marker);
          infowindow.open(this.map, marker);
        });
        this.markerInfo.push([marker, fountain]);
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
