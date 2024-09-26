import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    {
        path: 'login',
        // component: FormComponent,
        loadComponent: () => import('./components/form/form.component').then(l => l.FormComponent),
        title: 'Login'
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./components/form/form.component').then(s => s.FormComponent),
        title: 'Signup'
    },
    {
        path: '',
        component: MoviesComponent,
        title: 'Movies',
    },
    {
        path: ':category',
        loadComponent: () => import('./components/movies/movies.component').then(m => m.MoviesComponent)
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
