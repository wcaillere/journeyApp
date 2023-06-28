import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {LocationsService, Location} from "../../services/locations.service";

export interface noteInput{
  title: string;
  date: string;
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
    date: "",
    locationId: null,
    description: "",
    photos: []
  };

  locationList: Location[] = [];

  constructor(private noteSrv: NotesService, public locationSrv: LocationsService) { }

  ngOnInit() {
    this.locationSrv.locationListChanged.subscribe(
      (response: any) => {
        this.locationList = response;
      }
    )
    this.locationSrv.loadLocations();
  }

  saveNote(){
    let savedNote = new Note();
    savedNote.title = this.newNote.title;
    savedNote.date =  this.newNote.date;
    savedNote.locationId = this.newNote.locationId;
    savedNote.description = this.newNote.description;
    savedNote.photos = this.newNote.photos;
    this.noteSrv.saveNote(savedNote);
  }

}
