import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list-component',
  templateUrl: './shopping-list-component.component.html',
  styleUrls: ['./shopping-list-component.component.css'],
  providers: []
})
export class ShoppingListComponentComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(){
    
  }

}
