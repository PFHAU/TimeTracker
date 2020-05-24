import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Subscription } from 'rxjs';

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
    private route: ActivatedRoute) { }
  
    ngOnInit(){
      this.taskSubscription = this.taskService.tasksSubject.subscribe(
        (tasks: any[]) => {
          this.tasks = tasks;
        }
      );
      this.taskService.emitTaskSubject();
    }

    addTaskToFolder(taskTitle){
      const nTask={
        id:this.tasks.length+1,
        name: taskTitle.value,
        compteur: 0,
        folder: this.folderName,
        isRunning: false
      }
      if(taskTitle.value!='' && taskTitle.value!=' '){
        this.taskService.addTask(nTask);
        taskTitle.value='';
      }
    }

}
