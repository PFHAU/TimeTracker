import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs'
import {TaskService} from "../service/task.service";

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

  constructor(private taskService: TaskService) { }

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
}
