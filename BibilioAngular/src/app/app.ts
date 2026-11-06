import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LivrePage } from './Page/livre-page/livre-page';

@Component({
  imports: [RouterOutlet, LivrePage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('BibilioAngular');
}
