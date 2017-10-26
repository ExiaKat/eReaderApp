import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { openDropdownDirective } from './shared/open-dropdown.directive';
import { SearchHeaderComponent } from './rental-management/search-header/search-header.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberResultComponent } from './member-search/member-result/member-result.component';
import { MemberInfoService } from './rental-management/services/member-info.service';
import { BorrowBooksComponent } from './rental-management/borrow/borrow-books/borrow-books.component';
import { ReturnBooksComponent } from './rental-management/return/return-books/return-books.component';
import { ToLocaleStringPipe } from './shared/to-locale-string.pipe';
import { LoginComponent } from './home-page/login/login.component';
import { AuthService } from './home-page/login/auth.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { InfoHeaderComponent } from './rental-management/info-header/info-header.component';

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
    MemberResultComponent,
    BorrowBooksComponent,
    ReturnBooksComponent,
    ToLocaleStringPipe,
    LoginComponent,
    InfoHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ MemberInfoService, AuthService, AuthGuardService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
