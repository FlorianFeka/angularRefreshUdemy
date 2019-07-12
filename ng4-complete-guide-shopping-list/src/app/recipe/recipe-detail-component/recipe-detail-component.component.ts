import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail-component',
  templateUrl: './recipe-detail-component.component.html',
  styleUrls: ['./recipe-detail-component.component.css']
})
export class RecipeDetailComponentComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      if(params){
        try {
          let id = Number(params['id']);
          let recipeList = this.recipeService.getRecipes();
          if(id<recipeList.length){
            this.recipe = recipeList[id];
          }else{
            this.router.navigate(['recipes']);
          }
        } catch (error) {
          this.router.navigate(['recipes']);
        }
      }

    })
  }

  onToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

}
