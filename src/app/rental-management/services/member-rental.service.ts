import { MemberInfo } from '../models/member-info.model';
import { RentalBook } from '../models/rental-book.model';
import { Subject } from 'rxjs/Subject';

export class MemberRentalService {
  private memberInfos: MemberInfo[] = [];

  setMemberInfo(memberInfo: MemberInfo) {
    this.memberInfos.push(memberInfo);
  }

  getMemberInfo() {
    return this.memberInfos;
  }
}