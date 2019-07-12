import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item-component',
    templateUrl:'recipe-item.component.html'
})

export class RecipeItemComponent implements OnInit{
    @Input() recipe: Recipe;
    @Input() index: Number;
    constructor(private recipeService:RecipeService){}
    onRecipeClick() {
        this.recipeService.recipeSelected.emit(this.recipe);
    }

    ngOnInit(){
    }
    
}