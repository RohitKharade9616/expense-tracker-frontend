import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * functional interceptor that shows/hides the global spinner
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> => {
  const loading = inject(LoadingService);
  loading.show();
  return next(req).pipe(
    finalize(() => {
      loading.hide();
    })
  );
};