import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import {} from 'googlemaps';
import { FountainService } from 'src/app/services/Fountain/fountain.service';

const loader = new Loader({
  apiKey: "AIzaSyAfowCfopxwTeabNFPuv0av4Bwc0-az0r8",
  version: "weekly",
});




const legend = document.getElementById("legend") as HTMLElement;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eau-secours';
  private fountainService: FountainService;
  private map: google.maps.Map;
  private marker: google.maps.Marker;

  constructor() { }

  ngOnInit() {
    this.initMap();
    this.addMarker();
    this.fountainService = new FountainService();
    
  }

  public addMarker(): void {
    loader.load().then(() => {
      
      const myLatLng = { lat: -25.363, lng: 131.044 };
      let legend = document.getElementById("legend") as HTMLElement;
      const infowindow = new google.maps.InfoWindow({
        content: legend.outerHTML,
      });
    
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 4,
          center: myLatLng,
        }
      );
      this.marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
      });
      this.marker.addListener("click", () => {
        legend.style.backgroundColor = "#323232";
        this.fountainService.Print();
        infowindow.open(map, this.marker);
      })
    });
  }

  public initMap(): void {
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }
}
