import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle = false;

  constructor() { }

  ngOnInit() {
  }

  onToggleMenu() {
    this.toggle = !this.toggle;
  }

  onToggleMenuClass() {
    return this.toggle ? "in" : "";
  }

}
