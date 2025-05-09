import { Component } from '@angular/core';
import { TodoComponent } from "./Features/todo/todo.component";

@Component({
  selector: 'app-root',
  imports: [TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Todo-Front';
}
