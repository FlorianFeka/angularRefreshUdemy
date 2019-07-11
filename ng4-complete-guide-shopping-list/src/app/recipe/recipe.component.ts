import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
 
  recipeElement: Recipe;

  constructor(private recipeService: RecipeService) { }

  onRecipeEvent(recipe: Recipe) {
    this.recipeElement = recipe;
  }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeElement = recipe;
      }
    )
  }

}
