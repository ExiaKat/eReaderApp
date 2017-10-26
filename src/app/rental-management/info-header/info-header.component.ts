import { Component, OnInit, Input } from '@angular/core';
import { MemberInfo } from '../models/member-info.model';
import { MemberInfoService } from '../services/member-info.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.css']
})
export class InfoHeaderComponent implements OnInit {
  @Input() memberInfo: MemberInfo;

  constructor() { }

  ngOnInit() {

  }
}
