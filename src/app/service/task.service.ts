import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class TaskService{

    tasksSubject = new Subject<any[]>();
    private tasks = this.localStorageService.getTasks();

    constructor(private localStorageService: LocalStorageService) { }

    addTask(taskToAdd: Task){
        this.tasks.unshift(taskToAdd);
        this.localStorageService.stockTask(taskToAdd);
        this.emitTaskSubject();
    }
    
    //update an existing task by id
    updateTask(id: number, task: Task){

    }

    emitTaskSubject(){
        this.tasksSubject.next(this.tasks.slice());
      }
}