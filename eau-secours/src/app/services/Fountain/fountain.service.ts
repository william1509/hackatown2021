import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  private i: number;
  constructor() { 
    this.i = 0;
  }

  public Print(): void {
    this.i++;
    console.log(this.i);
  }
}
