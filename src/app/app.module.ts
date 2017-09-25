import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { openDropdownDirective } from './shared/open-dropdown.directive';
import { HeaderComponent } from './rental-management/header/header.component';
import { BorrowComponent } from './rental-management/borrow/borrow.component';
import { ReturnComponent } from './rental-management/return/return.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RentalBooksService } from './rental-management/services/rental-books.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    openDropdownDirective,
    HeaderComponent,
    BorrowComponent,
    ReturnComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RentalBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
