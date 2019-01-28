import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Task } from './task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DataService]
})
export class HomeComponent implements OnInit {
  task: Task = new Task();   // изменяемый товар
  tasks: Task[];             // массив товаров
  menuMode: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadTasks();    // загрузка данных при старте компонента

  }

  // открываем создание новой задачи
  create() {
    this.cancel();
    this.task = new Task();
    this.menuMode = false;
  }

  loadTasks() {
    this.dataService.getTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data.reverse();
        this.sort();
      });
  }

  // сохранение данных
  save() {
    if (this.task.id == null) {
      this.dataService.createTask(this.task)
        .subscribe((data: Task) => this.tasks.unshift(data));
    } else {
      this.task.isEdited = false;
      this.dataService.updateTask(this.task)
        .subscribe(data => this.loadTasks());
    }
    this.cancel();
  }

 
  editTask(ts: Task) {
    if (ts.status == false) {
      this.task = ts;
      this.task.isEdited = !ts.isEdited;
    }
    else {
      alert("Нельзя редактировать завершенные задачи!");
    }
  }

  // отменяем создание новой задачи
  cancel() {
    if (this.task.id == null) {
      this.menuMode = true;
    }
    else {
      this.task.isEdited = false;
    }
  }

  delete(ts: Task) {
    this.dataService.deleteTask(ts.id)
      .subscribe(data => this.loadTasks());
  }

  deleteCompletedTasks() {
    this.dataService.deleteCompletedTasks()
      .subscribe(data => this.loadTasks());
  }

  close(ts: Task) {
    this.task = ts;
    this.task.status = !ts.status;
    this.save();
  }

  sort() {
    var i = 0;
    for (var j = 0; j < this.tasks.length; j++) {
      if (this.tasks[j].status != true
      ) {
        if (i < j) {
          var a = this.tasks[j];
          this.tasks[j] = this.tasks[i];
          this.tasks[i] = a;
        }
        i++;
      }
    }
  }
}
