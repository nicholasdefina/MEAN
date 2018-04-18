import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  //the component's css element selector
  templateUrl: './app.component.html',  //the location of the component's template file
  styleUrls: ['./app.component.css']  //the location of the component's private css styles
})

export class AppComponent { //exporting this component so that it can be used elsewhere
  title = 'Tour of Heroes';
}
