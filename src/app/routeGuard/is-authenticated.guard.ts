import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';



export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const { isLoggedIn } = inject(AuthService);
  const authService = inject(AuthService);
  console.log('checking auth status: ', authService.isAuthenticated);

  if (!authService.isAuthenticated) {
    router.navigate(['/sign-up']);
    return false;
  }
  
  return true;
};
