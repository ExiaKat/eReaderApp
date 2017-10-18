import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { MemberInfoService } from '../rental-management/services/member-info.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MemberInfo } from '../rental-management/models/member-info.model';
import { Child } from '../rental-management/models/child.model';
import { CanComponentDeactivate } from '../shared/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit, CanComponentDeactivate {
  memberInfoForm: FormGroup;
  editMode = false;
  buttonText = "Save";
  index: number;
  isSavedOrUpdated = false;

  get childrenFormArray() {
    return this.memberInfoForm.get("children") as FormArray;
  }

  constructor(private miService: MemberInfoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.index = params.id;
        this.editMode = true;
        this.buttonText = "Update";
        this.initForm();
        const memberInfo = this.miService.getMemberById(this.index);
        this.patchValueChildren(memberInfo.children);
        this.memberInfoForm.patchValue({
          memberNumber: memberInfo.memberNumber,
          parentName: memberInfo.parentName,
          mobile: memberInfo.mobile,
          eReader: {
            model: memberInfo.eReader.model,
            serialNumber: memberInfo.eReader.serialNumber,
            purchasingDate: memberInfo.eReader.purchasingDate ? memberInfo.eReader.purchasingDate.toISOString().substring(0, 10) : ""
          },
          deposit: memberInfo.deposit,
          expiryDate: memberInfo.expiryDate ? memberInfo.expiryDate.toISOString().substring(0,10) : ""
        });
      }
      else {
        this.initForm();
      }
    });
  }

  private initForm() {
    let childFormArray: FormGroup[] = [];
    if (!this.editMode) {
      childFormArray = [new FormGroup({
          'childName': new FormControl(null, Validators.required),
          'dob': new FormControl(null, Validators.required),
          'gender': new FormControl(null, Validators.required),
        })
      ]
    }
    this.memberInfoForm = new FormGroup({
      'memberNumber': new FormControl(null),
      'parentName': new FormControl(null, Validators.required),
      'mobile': new FormControl(null, Validators.required),
      'children': new FormArray(childFormArray),
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
      dob = child.dob.toISOString().substring(0,10);
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
    if(this.editMode)
      this.miService.updateMember(this.index, this.memberInfoForm.value)      
        .subscribe(
          (member: MemberInfo) => {
            this.isSavedOrUpdated = true;
            alert(`${this.memberInfoForm.value.parentName} has been updated.`);
            this.router.navigate(['search']);
          },
          (err) => console.log(`Failed to update ${this.memberInfoForm.value.parentName}`, err)
        );
    else 
      this.miService.addMember(this.memberInfoForm.value)
      .subscribe((res: Response) => {
        this.isSavedOrUpdated = true;
        alert(`New member ${this.memberInfoForm.value.parentName} saved successfully!`);
        this.router.navigate(['search']);
      }, err => {
        console.log(`Failed to save ${this.memberInfoForm.value.parentName}`, err);
      });;
    this.editMode = false;
    this.buttonText = "Save";
    this.isSavedOrUpdated = false; 
  }

  onDeleteMember() {
    this.miService.deleteMember(this.index)
      .subscribe((member: MemberInfo) => {
        alert(`${member.parentName} has been deleted!`);
        this.router.navigate(['search']);
      }, err => console.log(`Failed to delete member`, err));
  }  

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (this.memberInfoForm.touched && !this.isSavedOrUpdated) {
      return confirm("Do you want to leave this page without saving?");
    } else {
      return true;
    }
  }
}
