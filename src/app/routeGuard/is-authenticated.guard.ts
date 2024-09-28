import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';



export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const check = authService.isLoggedIn();

  if (!check) {
    router.navigate(['/sign-up']);
    return false;
  }
  
  return true;
};
