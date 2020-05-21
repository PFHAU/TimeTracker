import {Injectable} from '@angular/core';
import { Task } from '../model/Task.model';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{
    constructor(){}
    tasks:object[]=[];
    
    stockTask(task:Task ){
        try{
            this.tasks.push(task);
            localStorage.tasks = JSON.stringify(this.tasks);
        } catch(error){
            console.error("Impossible to save data in localStorage", error);
        }
    }
}