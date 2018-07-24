import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Room } from '../../../shared/model/room';
import { Book } from '../../../shared/model/book';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestoreService } from '../../../shared/services/angular-firestore.service';
import { AngularFireauthService } from '../../../shared/services/angular-fireauth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-data',
  templateUrl: './room-data.component.html',
  styleUrls: ['./room-data.component.scss']
})
export class RoomDataComponent implements OnInit, OnDestroy {

  @Output() userBooks = new EventEmitter<boolean>();
  @Output() spinner = new EventEmitter<boolean>();

  searchForm: FormGroup;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  oneDay = 24 * 3600 * 1000;
  peopleValue = [{
    name: '1 osoba',
    value: 1
  }, {
    name: '2 osoby',
    value: 2
  }, {
    name: '3 osoby',
    value: 3
  }];
  rooms: Room[];

  private roomsSubscription: Subscription;
  private booksSubscription: Subscription;

  constructor(private db: AngularFirestoreService, public auth: AngularFireauthService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      arrivalDate: new FormControl(null, Validators.required),
      departureDate: new FormControl(null, Validators.required),
      people: new FormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
      this.booksSubscription.unsubscribe();
    }
  }

  searchRooms() {
    this.spinner.emit(true);
    this.roomsSubscription = this.db.getRooms().subscribe(rooms => {
      if (rooms.length > 0) {
        this.searchBooksRoom(rooms);
      }
    });
  }

  searchBooksRoom(rooms: Room[]) {
    this.rooms = [];
    rooms.forEach(room => {
      this.spinner.emit(false);
      this.booksSubscription = this.db.getRoomBooks(room).subscribe(books => {
        let isBook = false;
        if (books.length > 0) {
          books.forEach(book => {
            if (this.checkBook(book)) {
              isBook = true;
            }
          });
          if (!isBook && room.people >= this.searchForm.get('people').value) {
            this.rooms.push(room);
          }
        } else {
          if (room.people >= this.searchForm.get('people').value) {
            this.rooms.push(room);
          }
        }
      });
    });
  }

  checkBook(book: Book): boolean {
    const userDeparture = this.searchForm.get('departureDate').value.getTime();
    const userArrival = this.searchForm.get('arrivalDate').value.getTime();
    const bookDeparture = book.departureDate;
    const bookArrival = book.arrivalDate;

    if (bookArrival <= userArrival && bookDeparture >= userDeparture) {
      // console.log('równe daty lub między bookDate');
      return true;
    } else if (bookArrival >= userArrival && bookDeparture >= userDeparture && bookArrival < userDeparture) {
      // console.log('odjazd pomiedzy');
      return true;
    } else if (bookArrival <= userArrival && bookDeparture <= userDeparture && bookDeparture > userArrival) {
      // console.log('przyjazd pomiedzy');
      return true;
    } else if (bookArrival > userArrival && bookDeparture < userDeparture) {
      // console.log('między userDate');
      return true;
    } else {
      return false;
    }
  }

  showUserBooks() {
    this.userBooks.emit(true);
  }

  getNumberOfNights(cost: number) {
    const numberOfNights = Math.round(Math.abs(
      (this.searchForm.get('arrivalDate').value.getTime() - this.searchForm.get('departureDate').value.getTime()
      ) / this.oneDay
    ));
    const costOfNights = cost * numberOfNights * this.searchForm.get('people').value;
    return { number: numberOfNights, cost: costOfNights };
  }

  bookRoom(room: Room) {
    const book: Book = {
      arrivalDate: this.searchForm.get('arrivalDate').value.getTime(),
      departureDate: this.searchForm.get('departureDate').value.getTime(),
      people: this.searchForm.get('people').value,
      cost: this.getNumberOfNights(room.cost).cost,
      nights: this.getNumberOfNights(room.cost).number,
    };

    this.db.addRoomBook(room, book);
    this.searchRooms();
  }

}
