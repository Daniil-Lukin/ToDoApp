import { TodoTask } from './TodoTask';

export interface DialogData {
  task: Partial<TodoTask>;
  enableDelete: boolean;
}
