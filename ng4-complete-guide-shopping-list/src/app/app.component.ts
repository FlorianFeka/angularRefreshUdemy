import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private loggingService: LoggingService) { }

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent NgOnInit!');
  }

}
