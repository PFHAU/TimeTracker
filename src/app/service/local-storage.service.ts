import {Injectable} from '@angular/core';
import { Task } from '../model/Task.model';
import { NullTemplateVisitor } from '@angular/compiler';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{
    constructor(){}
    tasks:object[]=this.getTasks();
    
    getTasks(){
        try{
            if(localStorage.tasks != null){
                return JSON.parse(localStorage.tasks);
            }else{
                return [];
            }
        } catch(error){
            console.error("Impossible de récupéré les données", error)
            return NullTemplateVisitor;
        }
    }

    updateTasks(tasks:Task[]){
        this.tasks=tasks;
        localStorage.tasks = JSON.stringify(this.tasks);
    }

    stockTask(task:Task ){
        try{
            this.tasks.unshift(task);
            localStorage.tasks = JSON.stringify(this.tasks);
        } catch(error){
            console.error("Impossible to save data in localStorage", error);
        }
    }

    deleteTask(task:Task){
        const index : number = this.tasks.indexOf(task);
        this.tasks.splice(index,1);
    }
}