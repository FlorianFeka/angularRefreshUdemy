import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  intervall;
  counter: number;
  counterHistory: number[] = [];
  @Output('counterEvent') counterEvent = new EventEmitter<{count: number}>();

  constructor() {
    this.counter = 0;
    this.counterHistory.push(this.counter);
  }

  ngOnInit() {
  }

  onStartGame(){
    this.intervall = setInterval(this.onIntervallTick.bind(this), 1000);
  }

  onStopGame() {
    clearInterval(this.intervall);
  }

  onIntervallTick() {
    this.counter = this.counter+1;
    this.counterHistory.push(this.counter);
    this.counterEvent.emit({count: this.counter});
  }

}
