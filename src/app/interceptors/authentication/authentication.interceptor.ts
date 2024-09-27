import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

const localStorage = new LocalStorageService();

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  console.log('auth token: ', authToken);
  if (authToken) {
    
    const authorization = req.headers.set('Authorization', `Bearer ${authToken}`);
    const authRequest = req.clone({headers: authorization});
    return next(authRequest);

  }
  return next(req);
};
