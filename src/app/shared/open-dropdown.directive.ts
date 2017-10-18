import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenDropdown]'
})
export class openDropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('mouseenter') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') closeDropdown() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }
}