import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { openDropdownDirective } from './shared/open-dropdown.directive';
import { SearchHeaderComponent } from './rental-management/search-header/search-header.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RentalBooksService } from './rental-management/services/rental-books.service';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberResultComponent } from './member-search/member-result/member-result.component';
import { MemberInfoService } from './rental-management/services/member-info.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    openDropdownDirective,
    SearchHeaderComponent,
    BorrowComponent,
    ReturnComponent,
    HomePageComponent,
    MemberInfoComponent,
    MemberSearchComponent,
    MemberResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RentalBooksService, MemberInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
