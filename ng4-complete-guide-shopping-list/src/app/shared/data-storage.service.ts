import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        this.authService.user.pipe(take(1)).subscribe(user => {
            
        });
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-guide-987d0.firebaseio.com/recipes.json',recipes).subscribe(res => {
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
            this.recipeService.setRecipes(recipes);
        }));
    }

}