import { TodoTask } from './TodoTask';

export interface DialogResult {
  task: TodoTask;
  delete?: boolean;
}
