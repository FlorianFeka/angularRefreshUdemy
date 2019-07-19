import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit-component',
  templateUrl: './shopping-list-edit-component.component.html',
  styleUrls: ['./shopping-list-edit-component.component.css']
})
export class ShoppingListEditComponentComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) shoppingListForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onAdd(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex, ingredient: newIngredient}));
    }else{
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredientByIndex(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear()
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
