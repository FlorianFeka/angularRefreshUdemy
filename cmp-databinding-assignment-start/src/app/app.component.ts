import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{

  ngOnChanges() {
    console.log("Change!");
  }

  onCounterEvent(counter: number) {
    console.log("Change!");
  }

}
