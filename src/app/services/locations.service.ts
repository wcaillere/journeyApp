import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "./notes.service";

export class Location {
  id!: number;
  name!: string;
  notes: number[] = [];
  localisation!: object;
}

const URL = 'http://localhost:3000/locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  locationList: Location[] = [];

  constructor(private http: HttpClient) {
  }

  loadLocations(){
    this.http.get(URL).subscribe(
      (response: any) => {
        console.log(response);
        this.locationList = response;
      }
    )
  }
}
