import { Injectable } from '@angular/core';
import { Fountain } from './fountain'

@Injectable({
  providedIn: 'root'
})
export class FountainService {
  public fountains: Fountain[];
  constructor() { 
    this.fountains = new Array<Fountain>();
    this.fountains.push(new Fountain(1, "district1", "park", "street1", "good", "45.59201175", "-73.58946238"));  
    this.fountains.push(new Fountain(1, "district1", "park", "street1", "good", "46", "-73.59005505")); 
  }
}
