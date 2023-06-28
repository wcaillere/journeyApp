import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {LocationsService} from "../../services/locations.service";

export interface noteInput{
  title: string;
  date: Date | null;
  locationId: number | null;
  description: string;
  photos: string[];
}
@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

  newNote: noteInput = {
    title: "",
    date: null,
    locationId: null,
    description: "",
    photos: []
  };

  constructor(private noteSrv: NotesService, public locationSrv: LocationsService) { }

  ngOnInit() {
    this.locationSrv.loadLocations();
  }

}
