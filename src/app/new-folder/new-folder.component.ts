import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Task } from '../model/Task.model';
import { TaskService } from '../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  folderForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private taskService: TaskService,
              private router: Router
    ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.folderForm = this.formBuilder.group({
      folderTitle:['', Validators.required],
      taskName:['',Validators.required],
    })
  }

  onSubmitForm(){
    const formValue=this.folderForm.value;
    const newTask= new Task(
      this.taskService.getId(),
      formValue['taskName'],
      0,
      formValue['folderTitle'],
      false,
     []
    );
    this.taskService.addTask(newTask);
    this.router.navigate(['/overview']);


  }

}
