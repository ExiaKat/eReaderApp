import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'borrow', component: BorrowComponent},
  { path: 'return', component: ReturnComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
