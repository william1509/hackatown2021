export class Fountain {
    id: number;
    district: string;
    nearestLandmark: string;
    intersection: string;
    state: string;
    latitude: string;
    longitude: string;

    constructor(id: number, district: string, nearestLandmark: string, intersection: string, state: string, latitude: string, longitude: string) {
        this.id = id;
        this.district = district;
        this.nearestLandmark = nearestLandmark;
        this.intersection = intersection;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude
    }
}