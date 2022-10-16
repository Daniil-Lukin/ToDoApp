import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoTask } from '../../interfaces/TodoTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() toDo: any = {
    title: '',
    description: '',
    id: '',
  };
  @Output() edit = new EventEmitter<TodoTask>();
  constructor() {}
}
