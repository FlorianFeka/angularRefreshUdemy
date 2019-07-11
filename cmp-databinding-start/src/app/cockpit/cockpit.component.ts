import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContent',{static:false}) serverContent: ElementRef;

  constructor() { }

  onAddServer(serverData: HTMLInputElement, serverContent:HTMLInputElement){
    this.serverCreated.emit({
      serverName: serverData.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }

  onAddBlueprint(blueprintData: HTMLInputElement, serverContent:HTMLInputElement){
    this.blueprintCreated.emit({
      serverName: blueprintData.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }

  ngOnInit() {
  }

}
