import { MemberInfo } from './member-info.model';
import { RentalBook } from './rental-book.model';

export class MemberRental {
  constructor(
    public memberInfo: MemberInfo,
    public rentalBooks: Array<RentalBook>
  ) {}
}