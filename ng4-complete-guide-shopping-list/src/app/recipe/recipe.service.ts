import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list-component/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<void>();
    recipeAdded = new Subject<number>();

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>){}


        private recipes: Recipe[] = [];

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addToShoppingList(recipe: Recipe){
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipe.ingredients));
        // this.shoppingListService.addIngredients(recipe.ingredients);
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

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next();
    }
}
