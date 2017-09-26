import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberResultComponent } from './member-search/member-result/member-result.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'borrow', component: BorrowComponent },
  { path: 'return', component: ReturnComponent },
  { path: 'member', component: MemberInfoComponent },
  { path: 'search', component: MemberSearchComponent, children: [
    { path: 'result', component: MemberResultComponent },
    { path: ':id/edit', component: MemberInfoComponent }
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
