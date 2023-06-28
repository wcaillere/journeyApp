import { Component, OnInit } from '@angular/core';
import {NotesService} from "../../services/notes.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public noteSrv: NotesService) { }

  ngOnInit() {
    this.noteSrv.loadNotes();
  }

}
