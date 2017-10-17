import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { MemberInfo } from '../models/member-info.model';
import { SearchQuery } from '../models/search-query.model';
import { RentalBook } from '../models/rental-book.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs';
import { Child } from '../models/child.model';

@Injectable()
export class MemberInfoService {  
  updateRentalBooks = new Subject<RentalBook[]>();
  members: Array<MemberInfo>
  localhost = "localhost";

  constructor(private http: Http) {}

  private getToken() : Headers {
    return new Headers({'x-auth': window.sessionStorage.getItem('jwt')});
  }

  addMember(memberInfo: MemberInfo) { 
    this.http.post(`http://${this.localhost}:3000/api/member`, memberInfo, {headers: this.getToken()})
      .subscribe((res: Response) => {
        alert(`New member ${memberInfo.parentName} saved successfully!
              ${res.status}`)
      }, err => {
        console.log(err);
      });
  }

  updateMember(index: number, newMemberInfo: MemberInfo) {
    const id = this.members[index]._id;
    let url = `http://${this.localhost}:3000/api/member/${id}`;
    this.http.patch(url, newMemberInfo, {headers: this.getToken()})
      .map((res: Response) => res.json().member as MemberInfo)
      .subscribe(
        (member: MemberInfo) => console.log("updated member info", member),
        (err) => console.log(`Failed to update member ${this.members[index].parentName}`, err)
      );
  }

  deleteMember(index: number) {
    const id = this.members[index]._id;
    let url = `http://${this.localhost}:3000/api/member/${id}`;
    return this.http.delete(url, {headers: this.getToken()})
      .map((res: Response) => res.json().member as MemberInfo);
  }

  getMember(queryArgs: SearchQuery) {
    const { parentName, mobile, serialNumber } = queryArgs;
    let url = `http://${this.localhost}:3000/api/member?parentName=${parentName}&mobile=${mobile}&serialNumber=${serialNumber}`
    return this.http.get(url, {headers: this.getToken()})
      .map((res: Response) => {
        let members: MemberInfo[] = res.json().members;
        members.forEach((member: MemberInfo) => {
          member.children.forEach((child: Child) => {
            child.dob = new Date(child.dob);
          });
          let purchasingDate = member.eReader.purchasingDate;
          let expiryDate = member.expiryDate;
          member.eReader.purchasingDate = this.convertToDateObject(purchasingDate);
          member.expiryDate = this.convertToDateObject(expiryDate);
          member.rentalBooks.forEach((book: RentalBook) => {
            let borrowDate = book.borrowDate;
            let returnDate = book.returnDate;
            book.borrowDate = this.convertToDateObject(borrowDate);
            book.returnDate = this.convertToDateObject(returnDate);
          });
        });
        return members;
      })
      .do((members: MemberInfo[]) => {
        this.members = members;
        console.log(this.members);
      });    
  }

  private convertToDateObject(dateString: any) {
    if (!dateString || "") return null;
    let date = new Date(dateString);
    return date;
  }

  getMemberById(index: number) {
    return this.members[index];
  }
  
  getMembers() {
    return this.members.slice();
  }

  setRentalBooks(index: number, rentalBooks: Array<RentalBook>) {
    console.log(this.members);
    let member = this.getMemberById(index);
    let filteredRentalBooks = rentalBooks.filter(rentalBook => {
      return !this.isBorrowedAndUnreturned(index, rentalBook);
    });
    member.rentalBooks.push(...filteredRentalBooks);
    this.updateMember(index, member);
  }

  returnRentalBooks(index: number, bIndex: number) {
    const memberInfo = this.getMemberById(index);
    memberInfo.rentalBooks[bIndex].returnDate = new Date();
    this.updateRentalBooks.next(memberInfo.rentalBooks);
    this.updateMember(index, memberInfo);
  }

  getRentalBooks(index: number) {
    return this.getMemberById(index).rentalBooks.slice();
  }

  isBorrowedAndUnreturned(index: number, book: RentalBook) {
    return this.getMemberById(index).rentalBooks.findIndex(
      (bookElem: RentalBook) => {
      return bookElem.bookName === book.bookName && bookElem.returnDate === null
    }) !== -1
  }

}