import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

// 298. Using BehaviourSubject
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// 285. Building an Auth Service
interface UsernameAvailableResponse {
  available: boolean
}

 interface SignupCredentials {
  username?: string | null;
  password?: string | null;
  passwordConfirmation?: string | null;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

//312. Sign in Authentication
interface SigninCredentials {
  username?: string | null;
  password?: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 292. Cleaning up the auth service
  rootUrl = 'https://api.angular-email.com';
  // 298. Using BehaviourSubject
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    // return this.http.post<any>(
    // return this.http.post< {available: boolean} >(
    return this.http.post<UsernameAvailableResponse>(
        // 'https://api.angular-email.com/auth/username', //url
        `${this.rootUrl}/auth/username`, //url
        {username: username}
      )
  }

  signup(credentials: SignupCredentials){
    console.log('enter signup function');
    console.log(credentials);
    return this.http.post<SignupResponse>(
      // 'https://api.angular-email.com/auth/signup', //url route
      `${this.rootUrl}/auth/signup`, //url route
      // {// request body
      //   credentials
      // }

      // There was an error when we use {credentials} as argument as above,
      // the resolusion is found here https://stackoverflow.com/questions/44006844/how-to-set-headers-to-application-json-in-angular-2
      JSON.stringify(credentials),
      {
        // headers:new HttpHeaders().set('Content-Type','application/json'),
        // 302. A gotcha around HttpCLient
        // withCredentials: true // 305. Modifying Outgoing Request
      }
    )
    // 298. Using BehaviourSubject
    .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  // 301. Checking Auth Status
  checkAuth(){
    return this.http.get<SignedInResponse>(
      // url
      `${this.rootUrl}/auth/signedin`, 
      // 302. A gotcha around HttpCLient
      // {withCredentials: true} // 305. Modifying Outgoing Request
    ).pipe(
      tap(
        // (response) 
        ({authenticated}) => {
        console.log("From checkAuth()");
        this.signedin$.next(authenticated);
      })
    );
  }

  // 308. Adding Sign Out
  signout() {
    return this.http.post(
      // signout url
      `${this.rootUrl}/auth/signout`, 
      // body
      {}
    ).pipe(
      tap(() => {this.signedin$.next(false);})
    );
  }

  //312. Sign in Authentication
  signin(credentials: SigninCredentials) {
    return this.http.post(
      `${this.rootUrl}/auth/signin`,
      JSON.stringify(credentials),
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }



}
