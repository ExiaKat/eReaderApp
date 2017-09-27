import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberRentalService } from '../services/member-rental.service';
import { MemberInfoService } from '../services/member-info.service';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private miService: MemberInfoService,
              private mrService: MemberRentalService) { }

  ngOnInit() {
  }

  onSearch(fm: NgForm) {
    const parentName = fm.value.parentName;
    const mobile = fm.value.mobile;
    const serialNumber = fm.value.serialNumber;
    let url = this.router.url;
    if (url.includes("/search"))
      this.router.navigate(['member'], {relativeTo: this.route, queryParams: {parentName, mobile, serialNumber}});
    else if (url.includes("/borrow")) {
      this.router.navigate(['member'], {relativeTo: this.route, queryParams: {parentName, mobile, serialNumber}});
    }
    else if (url.includes('/return')) {
      this.router.navigate(['member'], {relativeTo: this.route, queryParams: {parentName, mobile, serialNumber}});
    }
  }

}
