import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) { }

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
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredientByIndex(this.editedItemIndex);
    this.onClear()
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
