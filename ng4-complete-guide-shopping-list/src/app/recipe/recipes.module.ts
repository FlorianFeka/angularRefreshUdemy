import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponentComponent } from './recipe-list-component/recipe-list-component.component';
import { RecipeDetailComponentComponent } from './recipe-detail-component/recipe-detail-component.component';
import { RecipeComponent } from './recipe.component';
import { RecipeItemComponent } from './recipe-list-component/recipe-item-component/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { MessageComponent } from '../message/message.component';
@NgModule({
    declarations:[
    RecipeListComponentComponent,
    RecipeDetailComponentComponent,
    RecipeComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    MessageComponent
    ],
    imports: [
        RecipesRoutingModule,
         SharedModule, 
         ReactiveFormsModule
        ],
    // exports: [
    //     RecipeListComponentComponent,
    //     RecipeDetailComponentComponent,
    //     RecipeComponent,
    //     RecipeItemComponent,]
})
export class RecipesModule{

}