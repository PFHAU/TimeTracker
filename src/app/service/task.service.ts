import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';


@Injectable()
export class TaskService{

    tasksSubject = new Subject<any[]>();
    private tasks = [
        {
        id: 1,
        name: "zuagduyza",
        compteur: 0,
        folder: "kjahdkhzadhzadhoz"
        },
        {
        id: 2,
        name: "ladeuxieme",
        compteur: 0,
        folder: "QuickTask"
        },
        {
        id: 3,
        name: "nWord",
        compteur: 0,
        folder: "QuickTask"
        }
    ]

    constructor() { }

    addTask(taskToAdd: Task){
        this.tasks.unshift(taskToAdd);
        this.emitTaskSubject();
    }
    
    emitTaskSubject(){
        this.tasksSubject.next(this.tasks.slice());
      }
}