import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, MatCardModule],
})
export class TodoModule {}
