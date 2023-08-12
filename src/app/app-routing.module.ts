import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayout } from '@core/layouts/home/home.layout';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/sign-in',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@auth/auth.module').then((mod) => mod.AuthModule),
    },
    {
        path: 'home',
        component: HomeLayout,
        children: [
            {
                path: 'pokemons',
                loadChildren: () =>
                    import('@pokemon/pokemon.module').then(
                        (mod) => mod.PokemonModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
