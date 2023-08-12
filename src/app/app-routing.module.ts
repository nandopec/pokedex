import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedGuard } from '@core/guards/authenticated.guard';
import { notAuthenticatedGuard } from '@core/guards/not-authenticated.guard';
import { BlankLayout } from '@core/layouts/blank/blank.layout';
import { HomeLayout } from '@core/layouts/home/home.layout';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/sign-in',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        canActivate: [notAuthenticatedGuard],
        loadChildren: () =>
            import('@auth/auth.module').then((mod) => mod.AuthModule),
    },
    {
        path: 'home',
        component: HomeLayout,
        canActivate: [authenticatedGuard],
        children: [
            {
                path: '',
                redirectTo: 'pokemons',
                pathMatch: 'full',
            },
            {
                path: 'pokemons',
                loadChildren: () =>
                    import('@pokemon/pokemon.module').then(
                        (mod) => mod.PokemonModule
                    ),
            },
        ],
    },
    {
        path: 'error',
        component: BlankLayout,
        children: [
            {
                path: '',
                redirectTo: 'error/pages/not-found',
                pathMatch: 'full',
            },
            {
                path: 'pages',
                loadChildren: () =>
                    import('@error/error.module').then(
                        (mod) => mod.ErrorModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'error/pages/not-found',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
