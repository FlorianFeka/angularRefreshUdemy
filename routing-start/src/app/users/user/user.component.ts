import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@Angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((value:Params)=>{
      this.user = {
        id: value['id'],
        name: value['name']
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
