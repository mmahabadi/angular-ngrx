import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  styles: `
.main-container {
  @apply bg-gray-100 h-full bg-cover bg-top ;
  background-image: url("/assets/images/main-bg.jpg");
}
.main-overlay {
  @apply inset-0 bg-gradient-to-t from-gray-100 from-70% to-transparent pt-12;
}
.main-content {
  @apply container max-w-[1300px] p-4 h-full mx-auto bg-white rounded-t-xl shadow-md;
}
.header {
  @apply max-h-48 bg-cover bg-center rounded-lg flex justify-start overflow-hidden;
  background-image: url("/assets/images/header-bg.jpg");

  .header-overlay {
    @apply p-4 pt-12 flex w-full h-full inset-0 bg-gradient-to-t from-black to-transparent items-end;
  }
  .logo {
    @apply bg-white w-32 h-32 rounded-lg bg-cover bg-center;
    background-image: url("/assets/images/logo.png");
  }
  .company-name {
    @apply mx-2 text-white font-semibold text-2xl;
  }
}`,
  template: ` <main class="main-container">
    <div class="main-overlay">
      <div class="main-content">
        <header class="header">
          <div class="header-overlay">
            <div class="logo"></div>
            <a href="#" class="company-name">Kitchen Meat House</a>
          </div>
        </header>
        <ng-content></ng-content>
        <footer class="py-4 mt-8">
          <div class="container mx-auto text-center text-sm">
            <p>&copy; 2024 Kitchen Meat House. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  </main>`,
})
export class LayoutComponent {}
