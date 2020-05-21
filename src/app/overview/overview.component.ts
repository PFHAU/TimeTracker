import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs'
import {TaskService} from "../service/task.service";
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  tasks: any[]; 
  taskSubscription: Subscription;

  @Input() taskName: string;
  @Input() taskCompteur: number;
  @Input() taskFolder: string;
  @Input() taskId: number;

  constructor(private taskService: TaskService,
              private localStorageService: LocalStorageService
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
    const nTask={
      id:3,
      name: taskTitle.value,
      compteur: 0,
      folder:"QuickTask"
    }
    if(taskTitle.value!='' && taskTitle.value!=' '){
      this.taskService.addTask(nTask);
      this.localStorageService.stockTask(nTask);
      taskTitle.value='';
    }
  }
}
