import { Component } from '@angular/core';
import { LoggingService } from '../loggin.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: []
})
export class NewAccountComponent {
  
  constructor(private loggingService:LoggingService,
    private acccountService: AccountService){
      this.acccountService.statusUpdate.subscribe(
        (status: string) => alert('New Status: ' + status)
      );
    }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.acccountService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
