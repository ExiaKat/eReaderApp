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
      this.memberInfos = this.miService.getMember(queryParams);
      console.log(this.memberInfos);
    });
  }

}
