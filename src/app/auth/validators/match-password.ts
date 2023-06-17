import { Validator, FormGroup, AbstractControl } from '@angular/forms';

// 280. Connecting Custom Validators
import { Injectable } from '@angular/core';


// 280. Connecting Custom Validators
@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {

    // contract funtion from Validator Interface
    validate(formGroup: AbstractControl){
        const { password, passwordConfirmation } = formGroup.value;  
        if(password === passwordConfirmation) {
            return null;
        } else {
            return { passwordNotMatch: true }; // NOTE : authForm.errors === { passwordNotMatch: true }
        }
    }
}
