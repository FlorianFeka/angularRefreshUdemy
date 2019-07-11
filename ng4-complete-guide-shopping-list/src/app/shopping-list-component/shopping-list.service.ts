import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',10)
      ];

    ingredientListChanged = new EventEmitter<void>();

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientListChanged.emit();
    }

    addIngredients(ingredients: Ingredient[]) {
        // this.ingredients = this.ingredients.concat(ingredients);
        this.ingredients.push(...ingredients);
        this.ingredientListChanged.emit();
    }

    deleteIngredient(ingredient: Ingredient) {
        this.arrayRemoveIngredient(ingredient);
        this.ingredientListChanged.emit();
    }

    clearIngredients() {
        this.ingredients = [];
        this.ingredientListChanged.emit();
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