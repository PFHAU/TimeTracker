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
  
  
  isRuning=false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  //pour l'instant ca ne met a jour que si on met pause dans le local storage 
  runTask(){
    
    this.isRuning=!this.isRuning;
    if(this.isRuning){
      this.counter = interval(1000).subscribe(()=> this.taskCompteur++);
    }else{
      const t = new Task(this.taskId, this.taskName, this.taskCompteur, this.taskFolder)
      this.taskService.updateTask(this.taskId, t);
      this.counter.unsubscribe();
        }
  }

  deleteTask(){
    
    this.taskService.deleteTask(this.taskService.getTask(this.taskId));
    
  }

  ngInDestroy(){
    
  }

}
