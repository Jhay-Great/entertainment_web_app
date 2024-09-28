import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';



export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const { isLoggedIn } = inject(AuthService);
  const authService = inject(AuthService);
  console.log('checking auth status: ', authService.isAuthenticated);
  const check = authService.isLoggedIn();
  console.log('using isLoggedIn: ', check);

  if (!check) {
    router.navigate(['/sign-up']);
    return false;
  }
  
  return true;
};
