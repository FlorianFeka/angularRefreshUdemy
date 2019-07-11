import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from './loggin.service';

@Injectable()
export class AccountService{

    constructor(private loggingService:LoggingService){}

    public accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      statusUpdate = new EventEmitter<string>();

    addAccount(name: string, status:string){
        this.accounts.push({name:name,status:status});
        this.loggingService.logStatusChange(status);
    }
    update(id:number,status:string){
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}