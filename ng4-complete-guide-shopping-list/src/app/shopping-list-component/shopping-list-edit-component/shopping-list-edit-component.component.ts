import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit-component',
  templateUrl: './shopping-list-edit-component.component.html',
  styleUrls: ['./shopping-list-edit-component.component.css']
})
export class ShoppingListEditComponentComponent implements OnInit {
  @ViewChild('nameInput',{static:false}) name:ElementRef;
  @ViewChild('amountInput',{static:false}) amount:ElementRef;
  // @Output() addedEvent = new EventEmitter<{name: string, amount: number}>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd(){
    this.shoppingListService.addIngredient(new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value));
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value));
  }

  onClear() {
    this.shoppingListService.clearIngredients();
  }

}
