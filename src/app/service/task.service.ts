import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

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
        folder: "trump"
        },
        {
        id: 3,
        name: "nWord",
        compteur: 0,
        folder: "trump"
        }
    ]

    constructor() { }

    emitTaskSubject(){
        this.tasksSubject.next(this.tasks.slice());
      }
}