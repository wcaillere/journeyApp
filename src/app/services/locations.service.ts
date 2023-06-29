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

  modalNotes:  Note[] = [];
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

  getNotesOfOneLocation(location: Location){
    this.http.get(`http://localhost:3000/notes?locationId=${location.id}`).subscribe(
      (response: any)  => {
        this.modalNotes = response;
      }
    )
  }
}
