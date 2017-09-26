import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RentalBooksService } from '../../services/rental-books.service';
import { RentalBook } from '../../models/rental-book.model';
import { Subscription } from 'rxjs/Subscription';
import { MemberRentalService } from '../../services/member-rental.service';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrls: ['./borrow-books.component.css']
})
export class BorrowBooksComponent implements OnInit, OnDestroy {
  rentalBooks: Array<RentalBook>;
  subscription: Subscription;

  constructor(private rbService: RentalBooksService,
              private mrService: MemberRentalService) { }

  ngOnInit() {
    this.subscription = this.rbService.newRental.subscribe((rentalBooks) => {
      this.rentalBooks = rentalBooks;
    });
  }

  onborrowBook(fm: NgForm) {
    const bookName = fm.value.bookName;
    const quantity = fm.value.quantity;
    const borrowDate = new Date();
    this.rbService.borrowBook(bookName, quantity, borrowDate);
    fm.reset();
  }

  onSaveBooks() {
    const borrowedBooks = this.rbService.getRentalBooks();
    this.mrService.setRentalBooks(borrowedBooks);
    this.rbService.clearBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}
