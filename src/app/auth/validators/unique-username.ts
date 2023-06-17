import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AbstractControl } from '@angular/forms';
// 284. Handling Errors from Async Validation
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs"; // shortcut to generate observeables

// 285. Building an Auth Service
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{

    constructor(
        // private http: HttpClient // 285. Building an Auth Service : We comment this line (refactor)
        private authService: AuthService // 285. Building an Auth Service

    ){}

    validate = (control: AbstractControl) => {
        const { value } = control;
        console.log(value);
        // console.log(this.http); // 285. Building an Auth Service : We comment this line (refactor)
        return this.authService.usernameAvailable(value)
            .pipe(
                map(value => {return null;}),
                catchError((err) => {
                    // console.log(err);
                    if(err.error.username){
                        return of({ nonUniqueUsername: true })
                    } else {
                        return of({noConnection: true});
                    }
                })
            );
    }

}
