import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list-component/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('Test Recipe',
        'for testing pupose',
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries', 30)
        ]),
        new Recipe('Test2 Recipe',
        'for 2 testing pupose',
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('Buns',2)
        ])
      ];

    getRecipes() {
        return this.recipes.slice();
    }

    addToShoppingList(recipe: Recipe){
        this.shoppingListService.addIngredients(recipe.ingredients);
    }
}