import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  noteList: Note[] = [];

  constructor(public noteSrv: NotesService) { }

  ngOnInit() {
    this.noteSrv.noteListChanged.subscribe(
      (response: any)=> {
        this.noteList = response;
      }
    )
    this.noteSrv.loadNotes();
  }
}
