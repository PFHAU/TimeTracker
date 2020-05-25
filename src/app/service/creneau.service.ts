import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Creneau } from '../model/Creneau.model';

@Injectable()
export class CreneauService{
    creneauxSubject = new Subject<any[]>();
    private creneaux = this.localStorageService.getCreneaux();
    constructor(private localStorageService: LocalStorageService) { }

    addCreneau(taskId: number){
        var today = new Date();
        const c = new Creneau(this.creneaux.length, today, today , taskId);
        this.creneaux.unshift(c);
        this.localStorageService.stockCreneau(c);
        //this.emitTaskSubject();
    }

    getCreneauxByTaskID(taskId: number){
        const res:Creneau[]=[];
        for (var i=0; i< this.creneaux.length; i++){
            if(this.creneaux[i].taskId==taskId){
                res.push(this.creneaux[i])
            }
        }
    }
}