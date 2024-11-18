import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  emailOrNom: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.authenticateUser(this.emailOrNom).subscribe({
      next: (user) => {
        if (user) {
          alert(`Bienvenue ${user.nom} !`); //Il n'y a pas de gestion de mot de passe
          this.userService.login(user);
          this.router.navigate(['/home']);
        } else {
          alert('Identifiants incorrects.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la tentative de connexion :', err);
        alert('Une erreur est survenue.');
      }
    });
  }

  goToAdminLogin(): void {
    this.router.navigate(['/admin']);
  }
}
