export class Fountain {
    id: number;
    district: string;
    nearestLandmark: string;
    intersection: string;
    state: string;
    latitude: string;
    longitude: string;
    numberRatings: number;
    starRating: number;

    constructor(id: number, district: string, nearestLandmark: string, intersection: string, state: string, latitude: string, longitude: string, numberRatings: number, starRating: number) {
        this.id = id;
        this.district = district;
        this.nearestLandmark = nearestLandmark;
        this.intersection = intersection;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.numberRatings = numberRatings;
        this.starRating = starRating;

    }
}