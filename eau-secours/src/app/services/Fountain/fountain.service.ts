import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fountain } from './fountain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  public fountains: Fountain[];
  private server = "http://localhost:3000";

  public currentFoutain: Fountain;

  constructor(private http: HttpClient) { 
    this.currentFoutain = {id: 0, arrondissement: "null", parc: "null", repere: "null", latitude: "0.0", longitude: "0.0", rating: 1, ratingNumber: 1000};
    this.fountains = new Array<Fountain>();
    this.fountains.push({
      id: 1, arrondissement: "district1", parc: "park", repere: "street1", latitude: "45.59201175", longitude: "-73.58946238", rating: 1, ratingNumber: 1000 });  
    this.fountains.push({
      id: 2, arrondissement: "district1", parc: "park", repere: "coo, street lol", latitude: "46", longitude: "-73.59005505", rating: 1, ratingNumber: 1000 }); 
  }

  public getFountains(): Promise<Fountain[]> {
    return this.http.get<Fountain[]>(this.server + '/fountains').toPromise()
  }

  public uploadPicture(uploadData: FormData): Observable<any> {
    return this.http.post(this.server + '/upload', uploadData)
  }

  public sendRating(rating: number) {
    this.http.post(this.server + '/reviews', { id: this.currentFoutain.id, star: rating });
  }
}
