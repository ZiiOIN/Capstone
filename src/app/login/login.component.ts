import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  

})
export class LoginComponent {
  constructor(private router: Router){}
username: string = '';
password: string = '';
onSubmit(): void {
console.log('Form Submitted');
console.log("Username:" , this.username);
console.log("Password: ", this.password);
this.router.navigate(['./dashboard']);
}
 


}


