import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list-component',
  templateUrl: './recipe-list-component.component.html',
  styleUrls: ['./recipe-list-component.component.css']
})
export class RecipeListComponentComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  changeSubscription: Subscription;

  onRecipeEvent(recipe:Recipe){
  }

  constructor(private recipeService:RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.changeSubscription = this.recipeService.recipeChanged.subscribe(()=>{
      this.recipes = this.recipeService.getRecipes();
    })
    // this.recipeService.recipeAdded.subscribe((id:number)=>{
    //   this.recipes = this.recipeService.getRecipes();
    //   console.log(id);
    //   this.router.navigate(['../','shoppingList'],{relativeTo:this.route});
    //   });
    }
  
    ngOnDestroy(){
      this.changeSubscription.unsubscribe();
    }


}
