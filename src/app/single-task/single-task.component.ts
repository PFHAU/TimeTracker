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
  /*@Input() taskDates: [Date,Date];*/
  task: Task;
  dateActive: Date;


  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.dateActive=null;
    this.task=this.taskService.getTask(this.taskId);
    console.log("en dehor du if")
    console.log(this.taskIsRunning);
    if(this.taskIsRunning){
      console.log("ici");
      this.taskIsRunning=false;
      this.runTask();
    }
  }

  testfun(){
    var hh=Math.floor(this.taskCompteur / 3600);
    var mm=Math.floor(this.taskCompteur / 60);
    var ss=this.taskCompteur%60;
    var hhs;
    var mms;
    var sss;
    //var ss=0;
    if (hh   < 10) {hhs = "0"+hh;}else{hhs=hh.toString()}
    if (mm < 10) {mms = "0"+mm;}else{mms=mm.toString()}
    if (ss < 10) {sss = "0"+ss;}else{sss=ss.toString()}
    return hhs+":"+mms+":"+sss;
  }

  //pour l'instant ca ne met a jour que si on met pause dans le local storage 
  runTask(){
    /*const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, true, this.task.dates)
    this.taskService.updateTask(this.taskId, t);*/
    if(this.taskIsRunning==false){
      this.taskIsRunning=true;
      //this.taskService.getTask(this.taskId).isRunning=true;
      /*if(this.task.isRunning==false){
        const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, true, this.task.dates)
        this.taskService.updateTask(this.taskId, t);
      }*/
      this.counter = interval(1000).subscribe(()=> this.taskCompteur++);
      this.dateActive=new Date();
      //this.taskDates.pop();
     // this.task.dates.push([this.dateActive, null]);
      
    }else{
      this.taskIsRunning=false;
      let now = new Date();
      this.task.dates.pop();
      this.task.dates.push([this.dateActive, now]);
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, false, this.task.dates)
      this.taskService.updateTask(this.taskId, t);
      this.dateActive=null;
      this.counter.unsubscribe();
        }
  }

  deleteTask(){
    if(confirm("Voulez-vous vraiment supprimer cette tache?")){
      this.taskService.deleteTask(this.taskService.getTask(this.taskId));
    }else{
      return null
    }
  }

  ngOnDestroy(){
    
   /* const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder)
    this.taskService.updateTask(this.taskId, t);
    this.counter.unsubscribe();*/
    
    if (this.taskIsRunning==true){
      //this.task.dates.push([this.dateActive, null]);
      
      console.log("ggggg");
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, true, this.task.dates)
      this.taskService.updateTask(this.taskId, t);
      this.counter.unsubscribe();
      }
     /* this.task.dates.push([this.dateActive, null]);  
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder, true, this.task.dates)
      this.taskService.updateTask(this.taskId, t);*/
    
   
    
  }

}
type CoupleDates= [Date, Date];