import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    // console.log(context.getArgs());
    return next.handle().pipe(
      tap(() => {
        const Request = context.switchToHttp().getRequest();
        console.log(`URL: ${Request.url}`);
        console.log(`Duração ${Date.now() - dt} milisegundos`);
      }),
    );
  }
}
