import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { FormComponent } from './components/form/form.component';
import { isAuthenticatedGuard } from './routeGuard/is-authenticated.guard';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

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
        title: 'Signup',
    },
    {
        path: 'bookmarks',
        loadComponent: () => import('./components/bookmarks/bookmarks.component').then(b => b.BookmarksComponent),
        title: 'Your bookmarks',
        canActivate: [isAuthenticatedGuard]
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
];
