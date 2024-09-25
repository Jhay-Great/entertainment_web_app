import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';

export const routes: Routes = [
    {
        path: '',
        component: MoviesComponent,
        title: 'Movies',
    },
    {
        path: ':category',
        loadComponent: () => import('./components/movies/movies.component').then(m => m.MoviesComponent)
    },
    { 
        path: '**',
        redirectTo: ''
    }
];
