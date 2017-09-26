import { MemberRental } from '../models/member-rental.model';
import { MemberInfo } from '../models/member-info.model';
import { RentalBook } from '../models/rental-book.model';

export class MemberRentalService {
  memberRental: MemberRental = {memberInfo: null, rentalBooks: []};

  setMemberInfo(memberInfo: MemberInfo) {
    this.memberRental.memberInfo = memberInfo;
  }

  setRentalBooks(rentalBooks: Array<RentalBook>) {
    console.log(this.memberRental);
    this.memberRental.rentalBooks.push(...rentalBooks);
  }

  getMemberInfo() {
    return this.memberRental.memberInfo;
  }

  getRentalBooks() {
    return this.memberRental.rentalBooks.slice();
  }

  getMemberRental() {
    return this.memberRental;
  }
}