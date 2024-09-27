import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';


// const localStorage = new LocalStorageService();
// // const httpClient = new HttpClient();

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
  
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    router.navigate(['/sign-up']);
    return false;
  }
  router.navigate(['/bookmarks']);
  return true;
};
