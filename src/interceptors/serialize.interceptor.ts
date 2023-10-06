import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before the request is handled by the request handler
    console.log("I'm running before the handler", context);

    return handler.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        console.log("I'm running before the response is sent out", data);
      }),
    );
  }
}
