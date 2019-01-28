import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable()
export class DataService {
  private url = "/api/tasks";
  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get(this.url);
  }

  createTask(task: Task) {
    return this.http.post(this.url, task);
  }

  updateTask(task: Task) {
    return this.http.put(this.url + '/' + task.id, task);
  }

  deleteTask(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  deleteCompletedTasks() {
    return this.http.delete(this.url + '/completed');
  }

}
