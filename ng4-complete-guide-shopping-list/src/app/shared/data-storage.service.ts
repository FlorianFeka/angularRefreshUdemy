import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipe/store/recipe.actions';
import { SetRecipes } from '../recipe/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>) {}

    storeRecipes() {
        // this.store.select('auth').pipe(map(state => {
        //     return state.user;
        // }),take(1)).subscribe(user => {
        // });
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-guide-987d0.firebaseio.com/recipes.json', recipes).subscribe(res => {
            console.log(res);
        });
    }

    fetchRecipes() {
            return this.http.get<Recipe[]>(
                'https://ng-guide-987d0.firebaseio.com/recipes.json?'
        ).pipe(map(recipe => {
                // return ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []});
                return recipe;
            }),
        tap(recipes => {
            // this.recipeService.setRecipes(recipes);
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }));
    }

}
