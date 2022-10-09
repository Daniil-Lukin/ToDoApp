import { Component } from '@angular/core';
import { StatefulService } from './shared/services/stateful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';

  constructor(public state: StatefulService) {}
}
