import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { debug } from 'console';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationExecutionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    //console.log(context.switchToHttp());
    const userAgent = request.get('user-agent');
    const { ip, method, path: url } = request;
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`
        ip: ${ip} 
        method:${method} 
        url:${url} 
        user-agent:${userAgent ? userAgent : ''} 
        duration : ${Date.now() - start}ms`);
      }),
    );
  }
}
