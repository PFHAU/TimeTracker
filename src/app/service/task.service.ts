import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { LocalStorageService } from './local-storage.service';


@Injectable()
export class TaskService{

    tasksSubject = new Subject<any[]>();
    private tasks = this.localStorageService.getTasks();

    constructor(private localStorageService: LocalStorageService) { }

    //return the list of all the folders
    getAllFolder(){
        const folders:String[]=[];
        for(var i=0; i<this.tasks.length; i++){
            console.log(this.tasks[i].folder);
            if(!folders.includes(this.tasks[i].folder)){
                folders.push(this.tasks[i].folder);
            }
        }
        console.log(folders);
        return folders;
    }

    //return task that have the given id
    getTask(idOfTaskToGet: number): Task{
        
        for (var i=0; i< this.tasks.length; i++){
            if(this.tasks[i].id==idOfTaskToGet){
                return this.tasks[i];
            }
        }
        
    }

    //get the index of the task in the list
    getTaskIndex(idOfTaskToGet: number){
        
        for (var i=0; i< this.tasks.length; i++){
            if(this.tasks[i].id==idOfTaskToGet){
                return i;
            }
        }
        
    }

    //add the given task to the tasks list
    addTask(taskToAdd: Task){
        this.tasks.unshift(taskToAdd);
        this.localStorageService.stockTask(taskToAdd);
        this.emitTaskSubject();
    }
    
    //delete the given task 
    deleteTask(taskToDelete: Task){
        const index : number = this.tasks.indexOf(taskToDelete);
        this.tasks.splice(index,1);
        this.localStorageService.updateTasks(this.tasks);
        this.emitTaskSubject();
    }

    //update an existing task by id
    updateTask(id: number, task: Task){
        this.tasks[this.getTaskIndex(id)]=task;
        this.localStorageService.updateTasks(this.tasks);
        this.emitTaskSubject();
    }

    //return the task i
    getId(){
        return this.tasks.length+1;
    }
    
    emitTaskSubject(){
        this.tasksSubject.next(this.tasks.slice());
      }


}