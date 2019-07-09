import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ShoppingListComponentComponent } from './shopping-list-component/shopping-list-component.component';
import { ShoppingListEditComponentComponent } from './shopping-list-component/shopping-list-edit-component/shopping-list-edit-component.component';
import { RecipeListComponentComponent } from './recipe/recipe-list-component/recipe-list-component.component';
import { RecipeDetailComponentComponent } from './recipe/recipe-detail-component/recipe-detail-component.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeItemComponent } from './recipe/recipe-list-component/recipe-item-component/recipe-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ShoppingListComponentComponent,
    ShoppingListEditComponentComponent,
    RecipeListComponentComponent,
    RecipeDetailComponentComponent,
    RecipeComponent,
    RecipeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
