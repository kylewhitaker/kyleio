import { Component, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  themeColors = [
    'primary',
    // 'secondary',
    // 'success',
    // 'info',
    // 'warning',
    // 'danger',
    // 'light',
    // 'dark'
  ];

  isDark(color: string): boolean {
    return color === 'dark' || color === 'danger';
  }
}
