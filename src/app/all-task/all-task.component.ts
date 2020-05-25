import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {


  tasks: any[]; 
  taskSubscription: Subscription;

  folders=this.taskService.getAllFolder();
  constructor(private taskService: TaskService) { }
  
  ngOnInit(){
    //we just want all tasks here.
    this.taskSubscription = this.taskService.tasksSubject.subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.emitTaskSubject();
  }

}
