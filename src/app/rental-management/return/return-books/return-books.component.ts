import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberInfo } from '../../models/member-info.model';
import { MemberInfoService } from '../../services/member-info.service';
import { RentalBook } from '../../models/rental-book.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
    this.rbSubscription = this.miService.updateRentalBooks
      .subscribe((rentalBooks: Array<RentalBook>) => {
        this.rentalBooks = rentalBooks;
      });
  }

  onReturnBook(index: number) {
    this.miService.returnRentalBooks(this.index, index);
  }

}
