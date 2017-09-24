import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenDropdown]'
})
export class openDropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}