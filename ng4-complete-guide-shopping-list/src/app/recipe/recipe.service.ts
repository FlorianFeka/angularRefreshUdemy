import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list-component/shopping-list.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<void>();
    recipeAdded = new Subject<number>();

    constructor(private shoppingListService: ShoppingListService,
        private router: Router){}
        private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe('Test Recipe',
    //     'for testing pupose',
    //     'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries', 30)
    //     ]),
    //     new Recipe('Test2 Recipe',
    //     'for 2 testing pupose',
    //     'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('Buns',2)
    //     ])
    //   ];

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addToShoppingList(recipe: Recipe){
        this.shoppingListService.addIngredients(recipe.ingredients);
    }

    deleteRecipeById(id:number) {
        this.recipes.splice(id,1);
        this.recipeChanged.next();
    }

    setRecipes(recipes){
        this.recipes = (recipes as Recipe[]);
        this.recipeChanged.next();
    }

    addRecipe(recipe: Recipe){
        this.recipes.push((recipe as Recipe));
        this.recipeChanged.next();
        // let length: number = this.recipes.push(recipe)-1;
        // console.log(this.recipes);
        
        // this.recipeAdded.next(length);
    }
    
    updateRecipe(index:number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next();
    }
}