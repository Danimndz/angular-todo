import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  content: string = '';
  done: boolean = false;
  showForm: boolean = false;
  @Output() onSubmitTask: EventEmitter<Task> = new EventEmitter();
  constructor(private uiServices: UiService) {
    this.uiServices.onToggle().subscribe({
      next: (value) => (this.showForm = value),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.content) {
      alert('Please add the task!');
      return;
    }
    const newTask = {
      content: this.content,
      done: this.done,
    };

    this.onSubmitTask.emit(newTask);

    this.content = '';
    this.done = false;
  }
}
