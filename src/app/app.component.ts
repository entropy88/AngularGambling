import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './shared/fade-in-animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ fader],
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'gamblingProject';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
