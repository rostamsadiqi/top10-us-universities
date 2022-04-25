import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityComponent } from './components/university/university.component';

const routes: Routes = [
  {
    path:'', component:UniversityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
