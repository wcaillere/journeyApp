import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "./notes.service";
import {Subject} from "rxjs";

export class Location {
  id!: number;
  name!: string;
  notes: number[] = [];
  localisation!: any;
}

const URL = 'http://localhost:3000/locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  locationListChanged: Subject<Location[]>;

  constructor(private http: HttpClient) {
    this.locationListChanged = new Subject<Location[]>();
  }

  loadLocations(){
    this.http.get(URL).subscribe(
      (response: any) => {
        this.locationListChanged.next(response);
      }
    )
  }
}
