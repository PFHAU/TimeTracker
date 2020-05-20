import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {


  @Input() taskName: string;
  @Input() taskCompteur: number;
  @Input() taskFolder: string;
  @Input() taskId: number;
  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
