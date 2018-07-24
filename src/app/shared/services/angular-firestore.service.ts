import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// import { Film } from '../models/film';
import { AngularFireauthService } from './angular-fireauth.service';
import { MatSnackBar } from '@angular/material';
import { Room } from '../model/room';
import { Book } from '../model/book';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularFirestoreService {

  private roomsCollection: AngularFirestoreCollection<Room>;
  private roomDoc: AngularFirestoreDocument<Room>;
  private rooms: Observable<Room[]>;
  private books: Observable<Book[]>;

  constructor(private db: AngularFirestore, private auth: AngularFireauthService) {
  }

  addRoomBook(room: Room, book: Book) {
    const id = this.db.createId();
    const user_id = this.auth.user.uid;
    const bookObj: Book = book;
    bookObj.user_id = user_id;
    bookObj.id = id;
    this.roomsCollection.doc(room.id).collection<Book>('books').doc(id).set(bookObj);
  }

  getRooms() {
    this.roomsCollection = this.db.collection<Room>('rooms');
    this.rooms = this.roomsCollection.valueChanges();
    return this.rooms;
  }

  getRoomBooks(room: Room) {
    this.roomDoc = this.db.doc<Room>('rooms/' + room.id);
    this.books = this.roomDoc.collection<Book>('books').valueChanges();
    return this.books;
  }

  getUserBooks(room: Room) {
    this.roomDoc = this.db.doc<Room>('rooms/' + room.id);
    this.books = this.roomDoc.collection<Book>('books', ref => ref.where('user_id', '==', this.auth.user.uid)).valueChanges();

    return this.books;
  }

  // updateRoomBook(room: Room, book: Book) {
    // this.bookDoc = this.db.doc<Book>('rooms/' + room.id + '/books/' + book.id);
    // this.book = this.bookDoc.valueChanges();

    // this.bookDoc.update(roomObj);
  // }

  // updateFilm(film: {}) {
  //   this.filmDoc = this.db.doc<{}>('films/' + film.id);
  //   this.film = this.filmDoc.valueChanges();

  //   this.filmDoc.update(film);
  // }

  // deleteFilm(id: string) {
  //   this.filmDoc = this.db.doc<{}>('films/' + id);
  //   this.filmDoc.delete();

  //   console.log('deleteFilm');
  // }
}
