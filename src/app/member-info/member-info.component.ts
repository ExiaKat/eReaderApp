import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MemberInfoService } from '../rental-management/services/member-info.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  memberInfoForm: FormGroup;
  editMode = false;
  buttonText = "Save";
  get childrenFormArray() {
    return this.memberInfoForm.get("children") as FormArray;
  }

  constructor(private miService: MemberInfoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        const index = params.id;
        this.editMode = true;
        this.buttonText = "Update";
        const memberInfo = this.miService.getMemberById(index);
        console.log(memberInfo);
        this.memberInfoForm.patchValue({
          memberNumber: memberInfo.memberNumber,
          parentName: memberInfo.parentName,
          mobile: memberInfo.mobile,
          children: memberInfo.children,
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
    if(this.editMode)
      this.miService.updateMember(this.memberInfoForm.value);
    else 
      this.miService.addMember(this.memberInfoForm.value);
    this.editMode = false;
    this.buttonText = "Save";
  }
}
