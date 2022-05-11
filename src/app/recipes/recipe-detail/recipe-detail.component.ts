import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // this.recipe = this.recipeService.getRecipe(this.id);
        this.store.select('recipes').pipe(map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })).subscribe(recipe => {
          this.recipe = recipe;
        });
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onDeleteRecipe() {
      // this.recipeService.deleteRecipe(this.id);
      this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
      this.router.navigate(['/recipes']);
  }

}
