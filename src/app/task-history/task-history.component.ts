import { Component, OnInit } from '@angular/core';
import { CreneauService } from '../service/creneau.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  constructor(private creneauService: CreneauService,
    private route: ActivatedRoute,
    ) { }
  taskId: number = this.route.snapshot.params['taskId'];
  ngOnInit() {
  }

}
