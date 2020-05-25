import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs'
import {TaskService} from "../service/task.service";
import { LocalStorageService } from '../service/local-storage.service';
import { Task } from '../model/Task.model';




@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  tasks: object[]; 
  taskSubscription: Subscription;

  folders=this.taskService.getAllFolder();

  @Input() taskName: string;
  @Input() taskCompteur: number;
  @Input() taskFolder: string;
  @Input() taskId: number;
  @Input() taskIsRunning: boolean;

  constructor(private taskService: TaskService,
    ) { }       

  ngOnInit(){
    this.taskSubscription = this.taskService.tasksSubject.subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.emitTaskSubject();
  }

  ngOnDestroy(){
    this.taskSubscription.unsubscribe();
  }

  
  addTask(taskTitle){
    
    const nTask: Task={
      id:this.tasks.length+1,
      name: taskTitle.value,
      compteur: 0,
      folder:"QuickTask",
      isRunning: false,
      dates: [null , null]
    }
    if(taskTitle.value!='' && taskTitle.value!=' '){
      this.taskService.addTask(nTask);
      taskTitle.value='';
    }
  }
}


