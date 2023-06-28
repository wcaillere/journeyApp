import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class Note {
  id!: number;
  title!: string;
  date!: Date;
  description?: string;
  photos: string[] = [];
}

const URL = 'http://localhost:3000/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteList: Note[] = [];

  constructor(private http: HttpClient) {
  }

  loadNotes(){
    this.http.get(URL).subscribe(
      (response: any) => {
        console.log(response);
        this.noteList = response;
        console.log(this.noteList)
      }
    )
  }
}
