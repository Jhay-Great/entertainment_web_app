import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';



export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const { isLoggedIn } = inject(AuthService);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated) { 
    router.navigate(['/sign-up']);
    return false;
  }
  router.navigate(['/bookmarks']);
  return true;
};
