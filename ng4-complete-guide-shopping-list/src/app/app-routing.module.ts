import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', loadChildren: () => import('./recipe/recipes.module').then(m => m.RecipesModule) },
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)},
  {path:'shoppingList', loadChildren: () => import('./shopping-list-component/shopping-list.module').then(s => s.ShoppingListModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}
    // ,{useHash:true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
