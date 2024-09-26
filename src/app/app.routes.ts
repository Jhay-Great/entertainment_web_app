import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { FormComponent } from './components/form/form.component';

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
        path: 'form',
        component: FormComponent,
        title: 'Form'
    },
    // {
        //     path: 'form',
        //     loadComponent: () => import('./components/form/form.component').then(f => f.FormComponent),
        //     title: 'Form'
        // }
        
        // { 
        //     path: '**',
        //     redirectTo: ''
        // },
    ];
