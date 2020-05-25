import {Injectable} from '@angular/core';
import { Task } from '../model/Task.model';
import { NullTemplateVisitor } from '@angular/compiler';
import { Creneau } from '../model/Creneau.model';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService{
    constructor(){}
    tasks:object[]=this.getTasks();
    creneaux:object[]=this.getCreneaux();

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

    //creneaux part
    getCreneaux(){
        try{
            if(localStorage.creneaux != null){
                return JSON.parse(localStorage.creneaux);
            }else{
                return [];
            }
        } catch(error){
            console.error("Impossible de récupéré les données", error)
            return NullTemplateVisitor;
        }
    }

    updateCreneaux(creneaux:Creneau[]){
        this.creneaux=creneaux;
        localStorage.tasks = JSON.stringify(this.creneaux);
    }

    stockCreneau(creneau:Creneau ){
        try{
            this.creneaux.unshift(creneau);
            localStorage.creneaux = JSON.stringify(this.creneaux);
        } catch(error){
            console.error("Impossible to save data in localStorage", error);
        }
    }
}