import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFirestoreService } from '../../../shared/services/angular-firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnDestroy {

  @Output() books = new EventEmitter<boolean>();
  @Output() spinner = new EventEmitter<boolean>();

  userBooks: BookForShow[];

  private roomsSubscription: Subscription;
  private booksSubscription: Subscription;

  constructor(private db: AngularFirestoreService) { }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
      this.booksSubscription.unsubscribe();
    }
  }

  showBooks() {
    this.books.emit(false);
  }

  showUserBook() {
    this.spinner.emit(true);
    this.userBooks = [];
    this.roomsSubscription = this.db.getRooms().subscribe(rooms => {
      rooms.forEach(room => {
        this.booksSubscription = this.db.getUserBooks(room).subscribe(books => {
          this.spinner.emit(false);

          if (books.length > 0) {
            books.forEach(book => {
              const bookForShow: BookForShow = {
                arrivalDate: new Date(book.arrivalDate),
                departureDate: new Date(book.departureDate),
                user_id: book.user_id,
                people: book.people,
                id: book.id,
                cost: book.cost,
                nights: book.nights,
                room_id: room.id,
                room_poster: room.poster,
                room_name: room.name
              };
              this.userBooks.push(bookForShow);
            });
          }
        });
      });
    });
  }
}

interface BookForShow {
  arrivalDate: Date;
  departureDate: Date;
  user_id: string;
  people: number;
  id: string;
  cost: number;
  nights: number;
  room_id: string;
  room_poster: string;
  room_name: string;
}
