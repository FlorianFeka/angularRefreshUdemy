import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() { }
  customIntervalOvservable: Observable<number>;
  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalOvservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5){
          observer.complete()
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      },1000);
    });

    customIntervalOvservable.pipe(map((data:number) => {
      return 'Round ' + (data + 1);
    }));
  
    this.firstObsSubscription = customIntervalOvservable.pipe(filter((data) => {
      return data > 0;
    }),
      map((data:number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data=>{
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log("complete");
    });
  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe();
  }

}
