import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fountain } from './fountain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  private fountains: Fountain[];
  private server = "http://localhost:3000";
  constructor(private http: HttpClient) {
  }

  public getFountains(): Promise<Fountain[]> {
    return this.http.get<Fountain[]>(this.server + '/fountains').toPromise()
  }

  public uploadPicture(uploadData: FormData): Observable<any> {
    return this.http.post(this.server + '/upload', uploadData)
  }
}
