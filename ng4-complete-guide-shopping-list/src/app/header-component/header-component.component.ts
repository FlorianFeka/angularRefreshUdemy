import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  @Output() recipeEvent = new EventEmitter<void>();
  @Output() shoppingListEvent = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }

  onRecipe() {
    this.recipeEvent.emit();
  }

  onShoppingList() {
    this.shoppingListEvent.emit();
  }

}
