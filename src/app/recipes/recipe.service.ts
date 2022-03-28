import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A Sandwich', 
        'A Vegetarian vegatabe and paneer sandwich', 
        'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20),
        ]),
        new Recipe('Another Sandwich', 
        'A Vegetarian vegatabe and paneer sandwich', 
        'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1),
        ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}