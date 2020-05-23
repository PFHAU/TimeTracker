import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { TaskService } from './service/task.service';
import { FolderComponent } from './folder/folder.component';



const appRoutes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'folder/:folder', component: FolderComponent},
  {path: '', component: OverviewComponent},
  {path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SingleTaskComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
