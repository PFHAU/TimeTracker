import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Observable, Subscription, interval } from 'rxjs';
import 'rxjs/add/observable/interval';

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

  runTask(){
    
    this.isRuning=!this.isRuning;
    if(this.isRuning){
      this.counter = interval(1000).subscribe(()=> this.taskCompteur++);
      /*const counter = Observable.interval(1000);
      counter.subscribe(
        (value)=>{
          this.taskCompteur=value;
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        } 
      );*/
    }else{

      this.counter.unsubscribe();
        }
  }

  deleteTask(){
    
    this.taskService.deleteTask(this.taskService.getTask(this.taskId));
    
  }

  ngInDestroy(){
    
  }

}
