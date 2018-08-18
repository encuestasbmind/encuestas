import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: '<div><h1>{{title}}</h1><encuestas-usuarios></encuestas-usuarios></div>'
})
export class AppComponent {
  title = 'Encuestas';
}
