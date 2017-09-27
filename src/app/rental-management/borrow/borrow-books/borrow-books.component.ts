import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RentalBooksService } from '../../services/rental-books.service';
import { RentalBook } from '../../models/rental-book.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { MemberInfoService } from '../../services/member-info.service';
import { MemberInfo } from '../../models/member-info.model';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrls: ['./borrow-books.component.css']
})
export class BorrowBooksComponent implements OnInit, OnDestroy {
  rentalBooks: Array<RentalBook>;
  memberId: string;
  memberInfo: MemberInfo;
  subscription: Subscription;

  constructor(private rbService: RentalBooksService,
              private route: ActivatedRoute,
              private miService: MemberInfoService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.memberId = params.id;
        this.memberInfo = this.miService.getMemberById(this.memberId);
      }
      else {
        alert("No member id is provided for borrowing books");        
      }
    });
    this.rentalBooks = this.rbService.getRentalBooks();
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
    if (borrowedBooks.length > 0) {
      this.miService.setRentalBooks(this.memberId, borrowedBooks);
      this.rbService.clearBooks();
    } 
    else  
      alert("Please add books first");
  }

  onDeleteBook(index: number) {
    this.rbService.deleteBook(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}
