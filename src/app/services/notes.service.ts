import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

export class Note {
  id!: number;
  title!: string;
  date!: string;
  locationId!: number | null;
  description?: string;
  photos: string[] = [];
}

const URL = 'http://localhost:3000/notes/';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteListChanged: Subject<Note[]>;

  constructor(private http: HttpClient, private router: Router) {
    this.noteListChanged = new Subject<Note[]>();
  }

  loadNotes(){
    this.http.get(URL).subscribe(
      (response: any) => {
        this.noteListChanged.next(response);
      }
    )
  }

  saveNote(data: Note) {
    this.http.post(URL, data).subscribe(
      (response: any)  => {
        this.loadNotes();
        this.router.navigateByUrl('/tabs/home')
      }
    )
  }

  deleteNote(id: number) {
    this.http.delete(URL + id).subscribe(
      (response: any)  => {
        this.loadNotes();
      }
    )
  }
}
