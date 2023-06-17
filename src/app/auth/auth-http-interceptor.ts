/* 303. Http Interceptor : 
* to make sure that we can configure our requests so that the options {withCredentials: true}
* is defaulted
*/
import { Injectable } from "@angular/core";
import { 
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,
    HttpHeaders,
    HttpEventType // 306. Other uses of interceptors

} from "@angular/common/http";
import { Observable } from "rxjs";

// 306. Other uses of interceptors
import { tap, filter } from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        console.log("TES HTTP INTERCEPTORS : ", req);
        // 305. Modifying Outgoing Request
        // req.withCredentials = true; // error read only property :(
        // We need to clone and pass the request clone
        const clonedReq = req.clone({
            withCredentials: true,
            headers:new HttpHeaders().set('Content-Type','application/json')
        })


        // return next.handle(req);
        return next.handle(clonedReq)
        // 306. Other uses of interceptors
        // .pipe(
        //     // filter(val => val.type === HttpEventType.Sent),
        //     tap(val => {
        //         if(val.type === HttpEventType.Sent) {
        //             console.log('Req was sent to the server');
        //         } else if (val.type === HttpEventType.Response) {
        //             console.log('Got a response from the API ', val);
        //         }
        //     })
        // );
    }
}
