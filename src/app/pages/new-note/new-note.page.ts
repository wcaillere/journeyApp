import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {LocationsService, Place} from "../../services/locations.service";
import {ToastController} from "@ionic/angular";

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

  locationList: Place[] = [];
  toastMessage: string = "";

  constructor(private noteSrv: NotesService, public locationSrv: LocationsService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.locationSrv.locationListChanged.subscribe(
      (response: any) => {
        this.locationList = response;
      }
    )
    this.locationSrv.loadLocations();
  }

  saveNote(){
    if (this.isInputValid()) {
      let savedNote = new Note();
      savedNote.title = this.newNote.title;
      savedNote.date =  this.newNote.date;
      savedNote.locationId = this.newNote.locationId;
      savedNote.description = this.newNote.description;
      savedNote.photos = this.newNote.photos;
      this.noteSrv.saveNote(savedNote);
    } else {
      this.showToast();
    }
  }

  async showToast() {
    let toast = await this.toastCtrl.create(
      {
        message: this.toastMessage,
        duration: 1000,
        color: "danger",
      }
    );
    toast.present();
  }

  isInputValid() {
    if (this.newNote.locationId === null) {
      this.toastMessage = "Veuillez choisir un lieu pour cette note";
      return false;
    }

    if (this.newNote.title === "") {
      this.toastMessage = "Veuillez renseigner un titre de note valide";
      return false;
    }

    if (this.newNote.date === "") {
      this.toastMessage = "Veuillez renseigner une date";
      return false;
    }

    return true;
  }
}
