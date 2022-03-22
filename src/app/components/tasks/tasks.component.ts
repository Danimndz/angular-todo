import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe({ next: (tasks) => (this.tasks = tasks) });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.idTodo !== task.idTodo))
      );
  }

  toggleTask(task: Task) {
    task.done = !task.done;
    this.taskService.onToggleTask(task).subscribe();
  }

  onAddTask(newTask: Task) {
    this.taskService.onSubmit_(newTask).subscribe({
      next: (task) => this.tasks.push(task),
    });
  }
}
