import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Task } from '../model/Task.model';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    this.initForm();
  }

  get f() { return this.exportForm.controls; }

  initForm(){
    this.exportForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      name:['',Validators.required],
    })
  }

  onSubmitForm(){

    this.submitted = true;
    if (this.exportForm.invalid) {
      return;
    }
    
    const separator = ',';
    const keys = Object.keys(this.localStorageService.tasks[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      this.localStorageService.tasks.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n'); 



    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, "tasks.csv");
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', "tasks.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}
