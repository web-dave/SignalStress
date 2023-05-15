import { Component, Signal, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { interval, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h3>{{ data() | json }}</h3>
    <h4>{{ title() }}</h4>
    <h4>{{ name() }}</h4>
    <h5>{{ age() }}</h5>
    <h5>{{ bar() }}</h5>
    <input type="text" #input />
    <button (click)="setName(input.value)">Save</button>
    <app-child [name]="bar"></app-child>
  `,
  imports: [CommonModule, RouterOutlet, ChildComponent],
})
export class AppComponent {
  bar = signal('BAR');
  data = signal({ title: 'Signal stress Test', name: 'Hurbelwonz', age: 7 });

  title = computed(() => this.data().title);
  name = computed(() => this.data().name);
  age = computed(() =>
    this.data().name.includes('Ö') ? this.data().age + 1 : this.data().age
  );
  foo = effect(() => {
    console.log(this.name());
    if (this.name().includes('Ö')) {
      alert('Ö wie schön!');
    }
  }, {});

  setAge(a: number) {
    const newValue = this.data();
    if (newValue.age !== a) {
      console.log('Arrgh', a);
      newValue.age = a;
      // this.data.mutate(() => newValue);
    }
  }

  setName(v: string) {
    const newValue = this.data();
    if (v.includes('Ö')) {
      newValue.age++;
    }
    this.data.mutate(() => newValue);
    //       const age = this.age() + 1;
    //       this.setAge(age);
    //     }
    console.log('SetNAme', v);

    newValue.name = v;
  }

  foo$ = interval(1500)
    .pipe(
      map((data) => 'index: ' + data),
      tap((data) => console.log(data))
    )
    .subscribe();
}
