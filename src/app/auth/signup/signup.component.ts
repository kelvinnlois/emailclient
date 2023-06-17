import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// 280. Connecting Custom Validators
import { MatchPassword } from '../validators/match-password';

// 282. Nasty Async Validators
import { UniqueUsername } from '../validators/unique-username';

// 291. Making the Sign Up Request
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], 
    // 282. Nasty Async Validators
    [this.uniqueUsername.validate]
    ),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20),
    ]),
  }, 
  // 280. Connecting Custom Validators
  {validators: [this.matchPassword.validate]}
  );
  
  constructor(
    private matchPassword: MatchPassword, // Dependency Injection
    private uniqueUsername: UniqueUsername, // Dependency Injection : 282. Nasty Async Validators
    private authService: AuthService //Dependency Injection : 291. Making the Sign Up Request
  ){}
  ngOnInit(): void {}


  // 291. Making the Sign Up Request
  onSubmit() {
    console.log("Form Submitted..");
    if(this.authForm.invalid) {
      console.log("INVALIDD");
      console.log(this.authForm);
      return;
    }
    // console.log(this.authForm.value);
    this.authService.signup(this.authForm.value)
    .subscribe({
      // response => {console.log(response);}

      // 293. Handling SignUp Errors
      next: response => {
        // navigate to some other routes
      },
      error: err => {
        if(!err.status){
          console.log("ERRORRR")
          this.authForm.setErrors({ noConnection: true });
        } else { // 294. Generic Error Handling
          this.authForm.setErrors({ unknownError: true});
        }
      }

    });



  }
}
