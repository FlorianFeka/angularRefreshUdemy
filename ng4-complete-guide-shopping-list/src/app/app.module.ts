import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { ShoppingListComponentComponent } from './shopping-list-component/shopping-list-component.component';
import { ShoppingListEditComponentComponent } from './shopping-list-component/shopping-list-edit-component/shopping-list-edit-component.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list-component/shopping-list.service';
import { MessageComponent } from './message/message.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipe/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipe/recipes.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    ShoppingListComponentComponent,
    ShoppingListEditComponentComponent,
    DropdownDirective,
    MessageComponent,
    RecipeEditComponent,
    AlertComponent,
    PlaceholderDirective,
    RecipesModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService,RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule { }
