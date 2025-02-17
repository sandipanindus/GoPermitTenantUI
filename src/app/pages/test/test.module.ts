import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [
  { path: '', component: TestComponent }, // Define your routes here
];

@NgModule({
  declarations: [TestComponent], // Declare the component
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Use forChild for feature modules
  ],
  exports: [RouterModule] // Export RouterModule if needed
})
export class TestModule { }

