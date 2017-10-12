import { RentalBook } from '../models/rental-book.model';
import { Subject } from 'rxjs/Subject';

export class RentalBooksService {
  rentalBooks: RentalBook[] = [];
  newRental = new Subject<RentalBook[]>();
  
  borrowBook(bookName: string, quantity: number, borrowDate: Date, returnDate: Date = null) {
    let book = new RentalBook(bookName, quantity, borrowDate, returnDate);
    this.rentalBooks.push(book);
    this.newRental.next(this.getRentalBooks());
  }

  getRentalBooks() {
    return this.rentalBooks.slice();
  }

  deleteBook(index: number) {
    this.rentalBooks.splice(index, 1);
    this.newRental.next(this.getRentalBooks());
  }

  clearBooks() {
    this.rentalBooks = [];
    this.newRental.next(this.getRentalBooks());
  }
}