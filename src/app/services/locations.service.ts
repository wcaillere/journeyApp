import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "./notes.service";
import {Subject} from "rxjs";
import {Location} from "@angular/common";

export class Place {
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
  locationListChanged: Subject<Place[]>;

  constructor(private http: HttpClient, private _location: Location) {
    this.locationListChanged = new Subject<Place[]>();
  }

  loadLocations(){
    this.http.get(URL).subscribe(
      (response: any) => {
        this.locationListChanged.next(response);
      }
    )
  }

  getNotesOfOneLocation(location: Place){
    this.http.get(`http://localhost:3000/notes?locationId=${location.id}`).subscribe(
      (response: any)  => {
        this.modalNotes = response;
      }
    )
  }

  saveLocation(location: Place) {
    this.http.post(URL, location).subscribe(
      (response: any)=> {
        this.loadLocations();
        this._location.back();
    }
    )
  }
}
