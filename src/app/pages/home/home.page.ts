import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  noteList: Note[] = [];
  filters =  {
    startDate: "",
    endDate: ""
  }
  noteListFiltered: Note[] = [];

  constructor(public noteSrv: NotesService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.noteSrv.noteListChanged.subscribe(
      (response: any)=> {
        this.noteList = response;
        this.noteListFiltered = this.noteList;
      }
    )
    this.noteSrv.loadNotes();
  }

  refreshFilters() {
    this.filters = {
      startDate: "",
      endDate: ""
    };
    this.noteListFiltered = this.noteList;
  }

  async  ShowDelete(id: number) {
    const alert = await this.alertCtrl.create({
      header: "Voulez-vous vraiment supprimer cette note ?",
      buttons: [
        {
          text: "annuler",
          role: 'cancel'
        },
        {
          text: "Confirmer",
          handler: () => {
            this.noteSrv.deleteNote(id);
          }
        }
      ]
    })
    await alert.present();
  }

  filterNotePerDate() {
    let dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if (dateRegex.test(this.filters.startDate) && dateRegex.test(this.filters.endDate)) {
      this.noteListFiltered = this.noteList.filter(note => new Date(note.date) <= new Date(this.filters.endDate) && new Date(note.date) >= new Date(this.filters.startDate));
    }
  }
}
