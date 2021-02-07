import { Component, Output, EventEmitter} from '@angular/core';
import { FountainService } from 'src/app/services/Fountain/fountain.service';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRating {
    @Output() private ratingChanged = new EventEmitter();
    
    private starNum: number = 5;
    private rating: number = 0;
    public starArr = []; // Used for DOM creation
    
    constructor(private fountainService: FountainService) {
        for(let i = 0; i < this.starNum; ++i) {
            this.starArr.push(i);
        }
    }
    
    onClick(rating: number) {
        this.rating = rating;
        this.fountainService.sendRating(rating);
        this.ratingChanged.emit(this.rating);

    }
    
    isChecked(rating: number) {
        return this.rating > (rating - 0.5);
    }


}