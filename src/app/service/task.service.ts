import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class TaskService{

    tasksSubject = new Subject<any[]>();
    private tasks = this.localStorageService.getTasks();

    constructor(private localStorageService: LocalStorageService) { }

    getTask(idOfTaskToGet: number): Task{
        
        for (var i=0; i< this.tasks.length; i++){
            if(this.tasks[i].id==idOfTaskToGet){
                return this.tasks[i];
            }
        }
        
    }

    addTask(taskToAdd: Task){
        this.tasks.unshift(taskToAdd);
        this.localStorageService.stockTask(taskToAdd);
        this.emitTaskSubject();
    }
    
    deleteTask(taskToDelete: Task){
        const index : number = this.tasks.indexOf(taskToDelete);
        this.tasks.splice(index,1);
        this.localStorageService.deleteTask(taskToDelete);
        this.emitTaskSubject();
    }

    //update an existing task by id
    updateTask(id: number, task: Task){

    }

    emitTaskSubject(){
        this.tasksSubject.next(this.tasks.slice());
      }
}