import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { RentalBook } from '../../models/rental-book.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { MemberInfoService } from '../../services/member-info.service';
import { MemberInfo } from '../../models/member-info.model';
import { CanComponentDeactivate } from '../../../shared/can-deactivate-guard.service';

@Component({
  selector: 'app-borrow-books',
  templateUrl: './borrow-books.component.html',
  styleUrls: ['./borrow-books.component.css']
})
export class BorrowBooksComponent implements OnInit, CanComponentDeactivate {
  rentalBooks: Array<RentalBook> = [];
  index: number;
  memberInfo: MemberInfo;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private miService: MemberInfoService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.index = params.id;
        this.memberInfo = this.miService.getMemberById(this.index);
      }
      else {
        alert("No member id is provided for borrowing books");        
      }
    });
  }

  onborrowBook(fm: NgForm) {
    const bookName = fm.value.bookName;
    const quantity = fm.value.quantity;
    const borrowDate = new Date();
    if (quantity < 1) 
      return alert("Quantity must be greater than 0");
    if (!this.miService.isBorrowedAndUnreturned(this.index, new RentalBook(bookName, quantity, borrowDate, null)))
      this.rentalBooks.push(new RentalBook(bookName, quantity, borrowDate, null));
    else {
      alert(`Please return ${bookName} first before borrowing again`);
    }
    fm.reset();
  }

  onSaveBooks() {
    if (this.rentalBooks.length > 0) {
      this.miService.setRentalBooks(this.index, this.rentalBooks.slice());
      this.rentalBooks = [];
    } 
    else  
      alert("Please add books first");
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (this.rentalBooks.length > 0) {
      return confirm("Do you want to leave this page without saving?");
    } else {
      return true;
    }
  }

  onDeleteBook(index: number) {
    this.rentalBooks.splice(index, 1);
  }
}
