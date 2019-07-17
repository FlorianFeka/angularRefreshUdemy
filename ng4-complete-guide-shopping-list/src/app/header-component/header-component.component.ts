import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;


  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  
  onLogout(){
    this.authService.logout();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      
    })

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
