import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private taskService: TaskService,
              private router: Router
    ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.exportForm = this.formBuilder.group({
      eMail:['', [Validators.required,Validators.email]],
    })
    alert("yo1");
  }

  onSubmitForm(){
    this.router.navigate(['/overview']);
    alert("yo");
  }

}
