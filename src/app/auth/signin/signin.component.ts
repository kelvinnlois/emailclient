import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//312. Sign in Authentication
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {}
  
  //311. Building the sign in flow
  authForm = new FormGroup(
    {
      username: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
      password: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(20),
      ]),
    }
  );

  //312. Sign in Authentication
  onSubmit(){
    console.log("Sign in form submitted..");
    if(this.authForm.valid) {
      console.log("Sign in form invalid : ");
      console.log(this.authForm);
      return;
    }

    // use AuthService to make signin request
    this.authService.signin(this.authForm.value)
      .subscribe({
        // 313. Showing Authentication Error
        next: () => {

        },
        error: ({err}) => {
          if(err.username || err.password) {
            console.log("Credential error when signin.. ");
            this.authForm.setErrors( {credentials: true} );
          } else if(!err.status){
            console.log("No connection signin error")
            this.authForm.setErrors({ noConnection: true });
          } else { // 294. Generic Error Handling
            console.log("Unknown connection signin error")
            this.authForm.setErrors({ unknownError: true});
          }
        }
      }
      );


  }

}
