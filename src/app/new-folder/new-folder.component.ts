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
  //form builder is used in this component
  constructor(private formBuilder: FormBuilder,
              private taskService: TaskService,
              private router: Router
    ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    //we don't want empty task and folder name, that why we use validator
    this.folderForm = this.formBuilder.group({
      folderTitle:['', Validators.required],
      taskName:['',Validators.required],
    })
  }

  // when the form is submited
  onSubmitForm(){
    const formValue=this.folderForm.value;
    const newTask= new Task(
      this.taskService.getId(),
      formValue['taskName'],
      0,
      formValue['folderTitle'],
      false,
     [null,null]
    );
    this.taskService.addTask(newTask);
    this.router.navigate(['/overview']);


  }

}
