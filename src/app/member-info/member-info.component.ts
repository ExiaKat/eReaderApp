import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MemberInfoService } from '../rental-management/services/member-info.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MemberInfo } from '../rental-management/models/member-info.model';
import { Child } from '../rental-management/models/child.model';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  memberInfoForm: FormGroup;
  editMode = false;
  buttonText = "Save";
  index: number;

  get childrenFormArray() {
    return this.memberInfoForm.get("children") as FormArray;
  }

  constructor(private miService: MemberInfoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.index = params.id;
        this.editMode = true;
        this.buttonText = "Update";
        const memberInfo = this.miService.getMemberById(this.index);
        console.log(memberInfo);
        this.patchValueChildren(memberInfo.children);
        this.memberInfoForm.patchValue({
          memberNumber: memberInfo.memberNumber,
          parentName: memberInfo.parentName,
          mobile: memberInfo.mobile,
          eReader: memberInfo.eReader,
          deposit: memberInfo.deposit,
          exiryDate: memberInfo.expiryDate
        });
      }
    });
  }

  private initForm() {
    this.memberInfoForm = new FormGroup({
      'memberNumber': new FormControl(null),
      'parentName': new FormControl(null, Validators.required),
      'mobile': new FormControl(null, Validators.required),
      'children': new FormArray([]),
      'eReader': new FormGroup({
        'model': new FormControl(null, Validators.required),
        'serialNumber': new FormControl(null, Validators.required),
        'purchasingDate': new FormControl(null)
      }),
      'deposit': new FormControl(null),
      'expiryDate': new FormControl(null)
    });
  }

  onAddChild(child: Child = null) {
    let childName, dob, gender = null;

    if(child) {
      childName = child.childName;
      dob = child.dob;
      gender = child.gender;
    }
    this.childrenFormArray.push(new FormGroup({
      'childName': new FormControl(childName, Validators.required),
      'dob': new FormControl(dob, Validators.required),
      'gender': new FormControl(gender, Validators.required),
    }));
  }

  private patchValueChildren(children: Child[]) {
    children.forEach(child => {
      this.onAddChild(child);
    });
  }

  onDeleteChild(index: number) {
    this.childrenFormArray.controls.splice(index, 1);
    this.memberInfoForm.value.children.splice(index, 1);
  }

  onSaveMember() {
    // console.log(this.memberInfoForm);
    if(this.editMode)
      this.miService.updateMember(this.index, this.memberInfoForm.value);
    else 
      this.miService.addMember(this.memberInfoForm.value);
    this.editMode = false;
    this.buttonText = "Save";
  }

  onDeleteMember() {
    this.miService.deleteMember(this.index)
      .subscribe((member: MemberInfo) => {
        alert(`${member.parentName} has been deleted!`);
      }, err => console.log(err));
  }

  private createMemberFromFormValue() {
    const formValue = this.memberInfoForm.value;
    const memberNumber = formValue.memberNumber;
    const parentName = formValue.parentName;
    const mobile = formValue.mobile;
    const children = formValue.children;
    const eReader = formValue.eReader;
    const deposit = formValue.deposit;
    const expiryDate = formValue.expiryDate;
    const memberInfo = new MemberInfo(
      memberNumber, 
      parentName, 
      mobile,
      children,
      eReader,
      deposit,
      expiryDate
    );
    return memberInfo;
  }
}
