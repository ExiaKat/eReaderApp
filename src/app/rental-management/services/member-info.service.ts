import { MemberInfo } from '../models/member-info.model';
import { SearchQuery } from '../models/search-query.model';

export class MemberInfoService {
  members: Array<MemberInfo> = [];

  addMember(memberInfo: MemberInfo) {
    this.members.push(memberInfo);
  }

  editMember(newMemberInfo: MemberInfo) {
    let index = this.members.findIndex(element => {
      return element._id === newMemberInfo._id;
    })
    this.members.splice(index, 1, newMemberInfo);
  }

  deleteMember(index: number) {
    this.members.splice(index, 1);
  }

  getMember(queryArgs: SearchQuery) {
    let parentName = queryArgs.parentName == "" ? null : queryArgs.parentName;
    let mobile = queryArgs.mobile == "" ? null : queryArgs.mobile;
    let serialNumber = queryArgs.serialNumber == "" ? null : queryArgs.serialNumber;
    if (parentName)
      return this.searchForMember("parentName", parentName);
    if (mobile)
      return this.searchForMember("mobile", mobile);
    if (serialNumber)
      return this.searchForMember("serialNumber", serialNumber);
    return [];
  }

  private searchForMember(property: string, query: string) {
    if(query) {
      let index = this.members.findIndex((elememt: MemberInfo) => {
        return elememt[property] === query;
      });
      return this.members.slice(index, index + 1);
    }
    return [];
  }

  getMembers() {
    return this.members.slice();
  }
}