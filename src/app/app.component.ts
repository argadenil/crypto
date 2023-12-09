import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crypto-world';
  isNighMode = false;
  toggleNightMode() {
    this.isNighMode = !this.isNighMode;
    if (this.isNighMode) {
      document.body.style.backgroundColor = '#222531';
      document.getElementById('m1')!.style.color = 'white';
      document.getElementById('m2')!.style.color = 'white';
      document.getElementById('main-navbar')!.style.backgroundColor = '#222531';
      document.getElementById('converter-container')!.style.backgroundColor = '#2B2E3D';
      document.getElementById('converter-container')!.style.border = '1px solid grey';
      document.getElementById('converter-container')!.style.borderRadius = '8px';
    }
    else {
      document.body.style.backgroundColor = '';
      if (document.getElementById('main-navbar'))
        document.getElementById('main-navbar')!.style.backgroundColor = '';
      if (document.getElementById('converter-container'))
        document.getElementById('converter-container')!.style.backgroundColor = 'rgb(255, 255, 255)';
      if (document.getElementById('converter-container'))
        document.getElementById('converter-container')!.style.border = '1px solid grey';
      if (document.getElementById('converter-container'))
        document.getElementById('converter-container')!.style.borderRadius = '8px';
      if (document.getElementById('m1'))
        document.getElementById('m1')!.style.color = 'black';
      if (document.getElementById('m2'))
        document.getElementById('m2')!.style.color = 'black';
    }
  }
}
