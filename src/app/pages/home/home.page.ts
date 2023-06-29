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

  constructor(public noteSrv: NotesService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.noteSrv.noteListChanged.subscribe(
      (response: any)=> {
        this.noteList = response;
      }
    )
    this.noteSrv.loadNotes();
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
    alert.present();
  }
}
