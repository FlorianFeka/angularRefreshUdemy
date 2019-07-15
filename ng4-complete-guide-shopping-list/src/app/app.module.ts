import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ShoppingListComponentComponent } from './shopping-list-component/shopping-list-component.component';
import { ShoppingListEditComponentComponent } from './shopping-list-component/shopping-list-edit-component/shopping-list-edit-component.component';
import { RecipeListComponentComponent } from './recipe/recipe-list-component/recipe-list-component.component';
import { RecipeDetailComponentComponent } from './recipe/recipe-detail-component/recipe-detail-component.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeItemComponent } from './recipe/recipe-list-component/recipe-item-component/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list-component/shopping-list.service';
import { MessageComponent } from './message/message.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ShoppingListComponentComponent,
    ShoppingListEditComponentComponent,
    RecipeListComponentComponent,
    RecipeDetailComponentComponent,
    RecipeComponent,
    RecipeItemComponent,
    DropdownDirective,
    MessageComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
