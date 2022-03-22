import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl: string = 'http://localhost:3001/api';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    console.log('');
    return this.http.get<Task[]>(`${this.apiUrl}/getTodos`);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.idTodo}`;
    return this.http.delete<Task>(url)
  }

  onToggleTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/updateTodo/${task.idTodo}`;
    if (task.done) {
      task.done = 1;
    } else {
      task.done = 0;
    }
    console.log(task);
    return this.http.put<Task>(url, task);
  }

  onSubmit_(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/addTodo`, task);
  }
}

//https://www.youtube.com/watch?v=3dHNOWTI7H8&ab_channel=TraversyMedia 51:25
