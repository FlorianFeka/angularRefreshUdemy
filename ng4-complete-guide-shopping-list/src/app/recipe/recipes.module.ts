import { NgModule } from '@angular/core';
import { RecipeListComponentComponent } from './recipe-list-component/recipe-list-component.component';
import { RecipeDetailComponentComponent } from './recipe-detail-component/recipe-detail-component.component';
import { RecipeComponent } from './recipe.component';
import { RecipeItemComponent } from './recipe-list-component/recipe-item-component/recipe-item.component';
@NgModule({
    declarations:[
    RecipeListComponentComponent,
    RecipeDetailComponentComponent,
    RecipeComponent,
    RecipeItemComponent,
    ],
    exports: [
        RecipeListComponentComponent,
        RecipeDetailComponentComponent,
        RecipeComponent,
        RecipeItemComponent,]
})
export class RecipesModule{

}