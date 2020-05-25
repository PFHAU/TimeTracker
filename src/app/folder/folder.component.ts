import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Subscription } from 'rxjs';
import { Task } from '../model/Task.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  
  folderName: string = this.route.snapshot.params['folder'];


  tasks: any[]; 
  taskSubscription: Subscription;
  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
  
    ngOnInit(){
      //we want all tasks, then pick the ones that belong to this folder
      this.taskSubscription = this.taskService.tasksSubject.subscribe(
        (tasks: any[]) => {
          this.tasks = tasks;
        }
      );
      this.taskService.emitTaskSubject();
    }

    addTaskToFolder(taskTitle){
      const nTask:Task={
        id:this.tasks.length+1,
        name: taskTitle.value,
        compteur: 0,
        folder: this.folderName,
        isRunning: false,
        dates: [null,null]
      }
      if(taskTitle.value!='' && taskTitle.value!=' '){
        this.taskService.addTask(nTask);
        taskTitle.value='';
      }
    }

    deleteFolder(){
      for(let task of this.tasks){
        if(task.folder==this.folderName){
          this.taskService.deleteTask(task)
        }
      }
      this.router.navigate(['/overview']);
    }

}
