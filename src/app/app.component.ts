import { Component } from '@angular/core';
// 298. Using BehaviourSubject
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // 298. Using BehaviourSubject
  signedin = false;

  constructor(private authService: AuthService){
  }
  ngOnInit(){
    this.authService.signedin$.subscribe((isSignedin) => {
      this.signedin = isSignedin;
    });
    this.authService.checkAuth().subscribe(() => {});

    // 308. Adding Sign Out
    setTimeout(() => {
      this.authService.signout().subscribe(() => {})
    }, 5000);
  }

}
