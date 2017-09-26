import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSearch(fm: NgForm) {
    const parentName = fm.value.parentName;
    const mobile = fm.value.mobile;
    const serialNumber = fm.value.serialNumber;
    if (this.router.url.includes("/search"))
      this.router.navigate(['result'], {relativeTo: this.route, queryParams: {parentName, mobile, serialNumber}});
  }

}
