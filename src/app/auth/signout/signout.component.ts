// 309. Automated Signouts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// 310. Programmatic Navigation
import { Router } from '@angular/router';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {


  // 309. Automated Signouts
  // Dependency Injection
  constructor(
    private authService: AuthService, 
    private router: Router
  ){}

  // 309. Automated Signouts
  ngOnInit(): void {
    this.authService.signout().subscribe(() => {
      // Navigate the user back to signin page
      // 310. Programmatic Navigation
      this.router.navigateByUrl('/');


    });
  }

}
