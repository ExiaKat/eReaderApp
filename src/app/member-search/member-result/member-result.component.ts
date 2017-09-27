import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberInfoService } from '../../rental-management/services/member-info.service';
import { SearchQuery } from '../../rental-management/models/search-query.model';
import { MemberInfo } from '../../rental-management/models/member-info.model';
import { MemberRentalService } from '../../rental-management/services/member-rental.service';

@Component({
  selector: 'app-member-result',
  templateUrl: './member-result.component.html',
  styleUrls: ['./member-result.component.css']
})
export class MemberResultComponent implements OnInit {
  memberInfos: Array<MemberInfo>;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private miService: MemberInfoService,
              private mrService: MemberRentalService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: SearchQuery) => {
      this.memberInfos = this.miService.getMember(queryParams);
    });
  }

  onSelectMember(index: number) {
    const url = this.router.url;
    //TODO: will change to use _id when connecting to database.
    const mobile = this.memberInfos[index].mobile;
    if (url.includes('/search'))
      this.router.navigate(['..', mobile, 'edit'], {relativeTo: this.route});
    else if (url.includes('/borrow')) {
      this.router.navigate(['/borrow-books', mobile]);
    }
    else if (url.includes('/return')) {
      this.router.navigate(['return-books', mobile]);
    }
  }

}
