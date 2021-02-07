import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fountain } from './fountain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  public fountains: Fountain[];
  private server: "https://localhost:3000";

  public currentFoutain: Fountain;

  constructor(private http: HttpClient) { 
    this.currentFoutain = {id: 0, district: "null", park: "null", landmark: "null", latitude: "0.0", longitude: "0.0",
    numberRatings: 0, starRating: 0 };
    this.fountains = new Array<Fountain>();
    this.fountains.push({
      id: 1, district: "district1", park: "park", landmark: "street1", latitude: "45.59201175", longitude: "-73.58946238",
      numberRatings: 5000, starRating: 2
    });  
    this.fountains.push({
      id: 2, district: "district1", park: "park", landmark: "coo, street lol", latitude: "46", longitude: "-73.59005505", 
      numberRatings: 7500, starRating: 4}); 
  }

  public getFountains(): void {
    
  }

  public uploadPicture(uploadData: FormData): Observable<any> {
    return this.http.post(this.server + '/upload', uploadData)
  }

  public sendRating(rating: number) {
    console.log(rating);
    this.http.post(this.server + '/reviews', { id: this.currentFoutain.id, star: rating });
  }
}
