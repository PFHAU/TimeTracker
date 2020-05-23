import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
   folderName: string = this.route.snapshot.params['folder'];
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {

  }

}
