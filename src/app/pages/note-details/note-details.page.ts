import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Note} from "../../services/notes.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Place} from "../../services/locations.service";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  noteDetails?: Note;
  noteLocation?: Place;

  constructor(private _location: Location, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(
      (response: any)=> {
        this.http.get("http://localhost:3000/notes/" + response.id).subscribe(
          (note: any) => {
            this.noteDetails = note;
            this.http.get("http://localhost:3000/locations/" + note.locationId).subscribe(
              (location: any) => {
                this.noteLocation  = location;
              }
            )
        }
        )
      }
    );
  }

  hasPhotos() {
    if (this.noteDetails != undefined)  {
      return this.noteDetails.photos.length  !==  0;
    }
    return false;
  }

  goBack() {
    this._location.back();
  }

}
