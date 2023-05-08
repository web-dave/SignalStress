import { Component, Input, Output, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: `<strong
    ><i>{{ name() }}</i></strong
  >`,
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input({ required: true }) name = signal('foo');

  constructor() {
    setTimeout(() => {
      this.name.set('FOOOOOOOOO');
    }, 3000);
  }
}
