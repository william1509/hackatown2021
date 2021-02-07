import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fountain } from './fountain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  public fountains: Fountain[];
  private server = "http://jai-soif.herokuapp.com";

  public currentFoutain: Fountain;

  constructor(private http: HttpClient) { 
    this.currentFoutain = {id: 0, arrondissement: "null", parc: "null", repere: "null", latitude: "0.0", longitude: "0.0", rating: 1, ratingNumber: 1000};
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
