import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MemberInfoService } from '../rental-management/services/member-info.service';


@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  memberInfoForm: FormGroup;
  get childrenFormArray() {
    return this.memberInfoForm.get("children") as FormArray;
  }

  constructor(private miService: MemberInfoService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.memberInfoForm = new FormGroup({
      'memberNumber': new FormControl(null),
      'parentName': new FormControl(null, Validators.required),
      'mobile': new FormControl(null, Validators.required),
      'children': new FormArray([
        new FormGroup({
          'childName': new FormControl(null, Validators.required),
          'dob': new FormControl(null, Validators.required),
          'gender': new FormControl(null, Validators.required)
        })
      ]),
      'eReader': new FormGroup({
        'model': new FormControl(null, Validators.required),
        'serialNumber': new FormControl(null, Validators.required),
        'purchasingDate': new FormControl(null)
      }),
      'deposit': new FormControl(null),
      'expiryDate': new FormControl(null)
    });
  }

  onAddChild() {
    this.childrenFormArray.push(new FormGroup({
      'childName': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required)
    }));
  }

  onDeleteChild(index: number) {
    this.childrenFormArray.controls.splice(index, 1);
  }

  onSaveMember() {
    console.log(this.memberInfoForm.value);
    this.miService.addMember(this.memberInfoForm.value);
  }
}
