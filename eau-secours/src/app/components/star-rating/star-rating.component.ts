import { Component } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRating {
    public rating: number = 5;
    
    public setRating(rating: number) {
        this.rating = rating;
    }
}