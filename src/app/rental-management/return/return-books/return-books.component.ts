import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MemberInfo } from '../../models/member-info.model';
import { MemberInfoService } from '../../services/member-info.service';
import { RentalBook } from '../../models/rental-book.model';

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.css']
})
export class ReturnBooksComponent implements OnInit{
  memberInfo: MemberInfo;
  rentalBooks: Array<RentalBook>;
  rbSubscription: Subscription;
  index: number;
  returnNotes: Array<string>;
  isNotReturnedChecked = false;

  constructor(private miService: MemberInfoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params.id) {
        this.index = params.id;
        this.memberInfo = this.miService.getMemberById(this.index);
      }
    });
    this.rentalBooks = this.miService.getRentalBooks(this.index);
    this.bindReturnNotes();
  }

  private bindReturnNotes() {
    this.returnNotes = [];
    for(let rentablBook of this.rentalBooks) {
      this.returnNotes.push(rentablBook.notes);
    }
  }
  

  onReturnBook(index: number) {
    let pos = this.getRentalBookPos(index);
    this.miService.returnRentalBooks(this.index, pos, this.returnNotes[index])
    .subscribe((memberInfo: MemberInfo) => {
      this.memberInfo = memberInfo;
      this.rentalBooks = this.memberInfo.rentalBooks;
      this.bindReturnNotes();
      this.isNotReturnedSelected();
    });
  }

  private getRentalBookPos(index: number) : number {
      let _id = this.rentalBooks[index]._id;
      return this.memberInfo.rentalBooks.findIndex(rentalBook => {
        return rentalBook._id === _id;
      });
  }
  
  onChange() {
    this.isNotReturnedSelected();
  }

  private isNotReturnedSelected() {
    if (this.isNotReturnedChecked) {
      this.rentalBooks = this.rentalBooks.filter((rentalBook: RentalBook) => {
        return !rentalBook.returnDate;
      });
      this.bindReturnNotes();
    } else {
      this.rentalBooks = this.memberInfo.rentalBooks;
      this.bindReturnNotes();
    }
  }

}
