import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 } from 'uuid';

@Injectable()
export class RequestInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const req: Request = ctx.req;
    req['request_id'] = v4();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return next.handle().pipe(tap(() => {}));
  }
}
