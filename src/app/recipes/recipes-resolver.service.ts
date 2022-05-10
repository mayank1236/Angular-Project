import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";

import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { take } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
    }
}