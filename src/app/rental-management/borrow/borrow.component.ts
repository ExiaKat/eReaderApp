import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RentalBooksService } from '../services/rental-books.service';
import { RentalBook } from '../models/rental-book.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit, OnDestroy{
  rentalBooks: RentalBook[];
  subscription: Subscription;

  constructor(private rbService: RentalBooksService) { }

  ngOnInit() {
    this.subscription = this.rbService.newRental.subscribe((rentalBooks) => {
      this.rentalBooks = rentalBooks;
    })
  }
  
  onborrowBook(fm: NgForm) {
    const bookName = fm.value.bookName;
    const quantity = fm.value.quantity;
    const borrowDate = new Date();
    this.rbService.borrowBook(bookName, quantity, borrowDate);
    fm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
