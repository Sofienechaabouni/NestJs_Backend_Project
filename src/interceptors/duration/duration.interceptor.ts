import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from "rxjs";

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn =  Date.now();
    console.log('request created At : ', dateIn);
    return next.handle().pipe(
      tap(()=>{const end = Date.now();//traiter le retour de mon observable sans le modifier
        console.log('request ended At : ', end);
      console.log(`duree:, ${ end-dateIn }`)})
    );
  }
}
