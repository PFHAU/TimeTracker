import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Observable, Subscription, interval } from 'rxjs';
import 'rxjs/add/observable/interval';
import { Task } from '../model/Task.model';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  counter: Subscription;
  
  @Input() taskName: string;
  @Input() taskCompteur: number;
  @Input() taskFolder: string;
  @Input() taskId: number;
  @Input() taskIsRunning: boolean;
  task: Task;
  dateActive: Date;


  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.dateActive=null;
    this.task=this.taskService.getTask(this.taskId);
    //if we quit the compnent when the task is runing, the task has to be running when we get back
    if(this.taskIsRunning){
      let now = new Date();
      //calcul of the running time.
      this.task.compteur=Math.floor((now.getTime()-this.task.dates[0][0].getTime())/1000);
      this.taskIsRunning=false;
      this.runTask();
    }
  }

  //this function return taskCompteur in HH:mm:SS
  secondToTime(){
    var hh=Math.floor(this.taskCompteur / 3600);
    var mm=Math.floor(this.taskCompteur / 60);
    var ss=this.taskCompteur%60;
    var hhs;
    var mms;
    var sss;
    if (hh   < 10) {hhs = "0"+hh;}else{hhs=hh.toString()}
    if (mm < 10) {mms = "0"+mm;}else{mms=mm.toString()}
    if (ss < 10) {sss = "0"+ss;}else{sss=ss.toString()}
    return hhs+":"+mms+":"+sss;
  }

  //this is the function for time running and stoping
  runTask(){
    
    if(this.taskIsRunning==false){
      this.taskIsRunning=true;
      this.counter = interval(1000).subscribe(()=> this.taskCompteur++);
      this.dateActive=new Date();
    }else{
      this.taskIsRunning=false;
      let now = new Date();
      this.task.dates.shift();
      this.task.dates.unshift([this.dateActive, now]);
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, false, this.task.dates)
      this.taskService.updateTask(this.taskId, t);
      this.dateActive=null;
      this.counter.unsubscribe();
        }
  }

  //this function delete the task after asking the user to confirm
  deleteTask(){
    if(confirm("Voulez-vous vraiment supprimer cette tache?")){
      this.taskService.deleteTask(this.taskService.getTask(this.taskId));
    }else{
      return null
    }
  }

  
  ngOnDestroy(){
    //we want to stock the actual timer and stock the fact that the task is running
    if (this.taskIsRunning==true){
      this.task.dates.unshift([this.dateActive, null]);
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, true, this.task.dates)
      this.taskService.updateTask(this.taskId, t);
      this.counter.unsubscribe();
      }   
  }

}
