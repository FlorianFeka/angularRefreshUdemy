import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail-component',
  templateUrl: './recipe-detail-component.component.html',
  styleUrls: ['./recipe-detail-component.component.css']
})
export class RecipeDetailComponentComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

}
