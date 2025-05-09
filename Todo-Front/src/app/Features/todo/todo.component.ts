import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../Core/Models/todo.model';
import { TodoService } from './services/todo.service';
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  state,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  animations: [
    trigger('todoItem', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ]),
    trigger('todoList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('checkboxState', [
      state('checked', style({
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6'
      })),
      state('unchecked', style({
        backgroundColor: 'transparent',
        borderColor: '#D1D5DB'
      })),
      transition('unchecked => checked', [
        animate('150ms ease-in')
      ]),
      transition('checked => unchecked', [
        animate('150ms ease-out')
      ])
    ])
  ]
})

export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  todoTitle = '';

  private readonly todoService = inject(TodoService);
activeTodoCount: any;
completedTodoCount: any;
  constructor() {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.todoTitle.trim()) return;

    const newTodo: Todo = { id: 0, title: this.todoTitle, isCompleted: false };
    this.todoService.addTodo(newTodo).subscribe(todo => {
      this.todoTitle = '';
      this.loadTodos();
    });
  }

  toggleComplete(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }
}
