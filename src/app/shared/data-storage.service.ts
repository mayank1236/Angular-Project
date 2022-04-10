import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}
    
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://cook-like-a-pro-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {

            return this.http.get<Recipe[]>(
                'https://cook-like-a-pro-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
            ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, 
                            ingredients: recipe.ingredients? recipe.ingredients : []};
                    }
                );
            }),
            tap(response => {
                this.recipeService.setRecipes(response);
            })
        );

    }
}