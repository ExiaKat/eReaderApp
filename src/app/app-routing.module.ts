import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberResultComponent } from './member-search/member-result/member-result.component';
import { BorrowBooksComponent } from './rental-management/borrow/borrow-books/borrow-books.component';
import { ReturnBooksComponent } from './rental-management/return/return-books/return-books.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'borrow', component: BorrowComponent, canActivate: [AuthGuardService], children: [
    { path: 'member', component: MemberResultComponent }
  ]},
  { path: 'borrow-books/:id', component: BorrowBooksComponent },
  { path: 'return', component: ReturnComponent, canActivate: [AuthGuardService], children: [
    { path: 'member', component: MemberResultComponent }
  ]},
  { path: 'return-books/:id', component: ReturnBooksComponent },
  { path: 'member', component: MemberInfoComponent, canActivate: [AuthGuardService] },
  { path: 'search', component: MemberSearchComponent, canActivate: [AuthGuardService], children: [
    { path: 'member', component: MemberResultComponent },
    { path: ':id/edit', component: MemberInfoComponent }
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
