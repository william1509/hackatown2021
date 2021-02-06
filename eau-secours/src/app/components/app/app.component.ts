import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import {} from 'googlemaps';
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
  title = 'eau-secours';
  private fountainService: FountainService;
  private map: google.maps.Map;

  constructor() { }

  ngOnInit() {

    this.fountainService = new FountainService();
    this.initMap();
    this.addMarker();
    
    
  }

  public addMarker(): void {
    loader.load().then(() => {
      // a changer avec child component fountain display
      let legend = document.getElementById("legend") as HTMLElement;
      const infowindow = new google.maps.InfoWindow({
        content: legend.outerHTML,
      });
    
      const map = new google.maps.Map(
        // a changer
        document.getElementById("map") as HTMLElement,
        {
          zoom: 4,
          center: { lat: 45.59201175, lng: -73.58946238 },
        }
      );
      this.fountainService.fountains.forEach(fountain => {
        let marker = new google.maps.Marker({
          position: { lat: parseInt(fountain.latitude, 10), lng: parseInt(fountain.longitude, 10) },
          map,
          title: "Hello World!",
        });
         marker.addListener("click", () => {
           infowindow.open(map, marker);
        })
      });
      
    });
  }

  public initMap(): void {
    loader.load().then(() => {
      // a changer
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }
}
