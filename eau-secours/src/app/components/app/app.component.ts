import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import {} from 'googlemaps';

const loader = new Loader({
  apiKey: "AIzaSyAfowCfopxwTeabNFPuv0av4Bwc0-az0r8",
  version: "weekly",
});

let map: google.maps.Map;
let marker: google.maps.Marker;
const legend = document.getElementById("legend") as HTMLElement;

function initMap(): void {
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
}


function addMarker(): void {
  loader.load().then(() => {
    const myLatLng = { lat: -25.363, lng: 131.044 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 4,
      center: myLatLng,
    }
  );

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
  });
}




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eau-secours';
  constructor() { }

  ngOnInit() {
    initMap();
    addMarker();
    
  }
}
