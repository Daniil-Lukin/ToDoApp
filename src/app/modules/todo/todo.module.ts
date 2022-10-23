import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskComponent } from './components/task/task.component';
import { MatCardModule } from '@angular/material/card';
import { TodoRoutingModule } from './todo-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoComponent } from './components/todo/todo.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TaskComponent,
    TodoComponent,
    TaskDialogComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    TodoRoutingModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [TaskComponent],
})
export class TodoModule {}
