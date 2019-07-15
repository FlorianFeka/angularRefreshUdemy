import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',10)
      ];
      
      startedEditing = new Subject<number>();

    ingredientListChanged = new Subject<void>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientListChanged.next();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientListChanged.next();
    }

    addIngredients(ingredients: Ingredient[]) {
        // this.ingredients = this.ingredients.concat(ingredients);
        this.ingredients.push(...ingredients);
        this.ingredientListChanged.next();
    }

    deleteIngredientByIndex(index: number){
        this.ingredients.splice(index,1);
        this.ingredientListChanged.next();
    }

    deleteIngredient(ingredient: Ingredient) {
        this.arrayRemoveIngredient(ingredient);
        this.ingredientListChanged.next();
    }

    clearIngredients() {
        this.ingredients = [];
        this.ingredientListChanged.next();
    }

    arrayRemoveIngredient(ingredient: Ingredient) {
        for(let i = 0; i < this.ingredients.length; i++){
            if(this.ingredients[i].name == ingredient.name &&
                this.ingredients[i].amount == ingredient.amount){
                this.ingredients.splice(i,1);
                i--;
            }
            console.log("delete\nData: Array ingredient - " + this.ingredients[i].name+" "+this.ingredients[i].amount +
            "\nTo delete ingredient - " + ingredient.name + " " + ingredient.amount);
        }
    }
}