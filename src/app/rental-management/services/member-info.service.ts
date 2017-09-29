import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { MemberInfo } from '../models/member-info.model';
import { SearchQuery } from '../models/search-query.model';
import { RentalBook } from '../models/rental-book.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs';

@Injectable()
export class MemberInfoService {  
  updateRentalBooks = new Subject<RentalBook[]>();
  members: Array<MemberInfo>

  constructor(private http: Http) {}

  addMember(memberInfo: MemberInfo) { 
    this.http.post('http://localhost:3000/api/member', memberInfo)
      .subscribe((res: Response) => {
        alert(`New member ${memberInfo.parentName} saved successfully!
              ${res.status}`)
      }, err => {
        console.log(err);
      });
  }

  updateMember(index: number, newMemberInfo: MemberInfo) {
    const id = this.members[index]._id;
    let url = `http://localhost:3000/api/member/${id}`;
    this.http.patch(url, newMemberInfo)
      .map((res: Response) => res.json().member as MemberInfo)
      .subscribe(
        (member: MemberInfo) => console.log("updated member info", member),
        (err) => console.log(`Failed to update member ${this.members[index].parentName}`, err)
      );
  }

  deleteMember(index: number) {
    const id = this.members[index]._id;
    let url = `http://localhost:3000/api/member/${id}`;
    return this.http.delete(url)
      .map((res: Response) => res.json().member as MemberInfo);
  }

  getMember(queryArgs: SearchQuery) {
    const { parentName, mobile, serialNumber } = queryArgs;
    let url = `http://localhost:3000/api/member?parentName=${parentName}&mobile=${mobile}&serialNumber=${serialNumber}`
    return this.http.get(url)
      .map((res: Response) => res.json().members as MemberInfo[])
      .do((members: MemberInfo[]) => this.members = members);    
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
      let index = member.rentalBooks.findIndex(elem => {
        return elem.bookName === rentalBook.bookName;
      });  
      return index == -1;
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
}