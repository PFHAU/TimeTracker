import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/Task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskEditForm: FormGroup;
  taskId: number = this.route.snapshot.params['taskId'];
  task=this.taskService.getTask(this.taskId);
  //we use form builder in this component, the form get the data and modify the task
  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.task);
  }

  initForm(){
    //we dont want invalid value here
    this.taskEditForm = this.formBuilder.group({
      taskName:[this.task.name, Validators.required],
      taskFolder: [this.task.folder, Validators.required],
      taskCompteur: [this.task.compteur, Validators.required]
    })
  }

  onSubmitForm(){
    const formValue=this.taskEditForm.value;
    const taskToUpdate= new Task(
      this.taskService.getId(),
      formValue['taskName'],
      formValue['taskCompteur'],
      formValue['taskFolder'],
      false,
      [null,null]
    );
    this.taskService.updateTask(this.taskId, taskToUpdate);
    this.router.navigate(['/overview']);


  }


}
