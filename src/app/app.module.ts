import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { TaskService } from './service/task.service';
import { FolderComponent } from './folder/folder.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const appRoutes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'folder/:folder', component: FolderComponent},
  {path: 'newFolder', component: NewFolderComponent},
  {path: '', component: OverviewComponent},
  {path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SingleTaskComponent,
    FolderComponent,
    NewFolderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
