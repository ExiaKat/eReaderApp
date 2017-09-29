import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberInfoService } from '../../rental-management/services/member-info.service';
import { SearchQuery } from '../../rental-management/models/search-query.model';
import { MemberInfo } from '../../rental-management/models/member-info.model';

@Component({
  selector: 'app-member-result',
  templateUrl: './member-result.component.html',
  styleUrls: ['./member-result.component.css']
})
export class MemberResultComponent implements OnInit {
  memberInfos: Array<MemberInfo>;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private miService: MemberInfoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: SearchQuery) => {
      this.miService.getMember(queryParams)
        .subscribe((members: MemberInfo[]) => {
          this.memberInfos = members;
        }, err => console.log(err));
    });
  }

  onSelectMember(index: number) {
    const url = this.router.url;
    if (url.includes('/search'))
      this.router.navigate(['..', index, 'edit'], {relativeTo: this.route});
    else if (url.includes('/borrow')) {
      this.router.navigate(['/borrow-books', index]);
    }
    else if (url.includes('/return')) {
      this.router.navigate(['return-books', index]);
    }
  }

}
