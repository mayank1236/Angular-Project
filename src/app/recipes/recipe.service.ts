import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
 //   private recipes: Recipe[] = [
 //      new Recipe('A Sandwich', 
 //       'A Vegetarian vegatabe and paneer sandwich', 
 //       'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp',
 //       [
 //           new Ingredient('Meat', 1),
 //           new Ingredient('French Fries', 20),
 //       ]),
 //       new Recipe('Another Sandwich', 
 //       'A Vegetarian vegatabe and paneer sandwich', 
 //       'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp',
 //       [
 //           new Ingredient('Buns', 2),
 //           new Ingredient('Meat', 1),
 //       ])
 //   ];

    private recipes: Recipe[] = [];

    constructor(
        private slService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
        ) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}