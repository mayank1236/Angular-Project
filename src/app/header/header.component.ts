import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
})


export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.userSub = this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        );
    }

    onSaveData() {
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
        // this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}