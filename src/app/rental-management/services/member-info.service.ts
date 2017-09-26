import { MemberInfo } from '../models/member-info.model';
import { SearchQuery } from '../models/search-query.model';

export class MemberInfoService {
  members: Array<MemberInfo> = [{
    _id: "12345",
    memberNumber: "123456",
    parentName: "Xia Hongfeng",
    mobile: "15962606201",
    children: [{
      childName: "Xia Xuelan",
      dob: new Date(2012,5,3),
      gender: "female"
    }],
    eReader: {model: "S800", serialNumber: "123456", purchasingDate: new Date(2015, 6, 11)},
    deposit: 100,
    expiryDate: new Date(2018, 1, 1)
  }];

  addMember(memberInfo: MemberInfo) {
    this.members.push(memberInfo);
    alert(`New member ${memberInfo.parentName} saved successfully!`)
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
    let memberArray: Array<MemberInfo> = [];
    if (property === "serialNumber") {
      this.members.forEach((memberInfo: MemberInfo) => {
        if (memberInfo.eReader[property] === query) {
          memberArray.push(memberInfo);
        }
      });
    }
    else if (query) {
      this.members.forEach((memberInfo: MemberInfo) => {
        if (memberInfo[property] === query) {
          memberArray.push(memberInfo);
        }
      });
    }
    return memberArray;
  }

  getMembers() {
    return this.members.slice();
  }
}