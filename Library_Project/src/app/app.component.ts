import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddComponent } from './add/add.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Library_Project';
}
