import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../loggin.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: []
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService:LoggingService,
    private accountService:AccountService){}

  onSetTo(status: string) {
    this.accountService.update(this.id,status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdate.emit(status);
  }
}
