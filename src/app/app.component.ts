import { Component, AfterViewInit } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (!('ethereum' in window)) {
      Object.defineProperty(window, 'ethereum', { value: {} });
    }

    const input = document.querySelector('input');
    if (input) input.focus();
  }
}
