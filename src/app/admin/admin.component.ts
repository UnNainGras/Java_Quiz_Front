import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  emailOrNom: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  login(): void {
    this.adminService.authenticateAdmin(this.emailOrNom).subscribe({
      next: (admin) => {
        if (admin) {
          alert(`Bienvenue Admin ${admin.nom} !`);
          this.adminService.login(admin);
          this.router.navigate(['/home']);
        } else {
          alert('Identifiants admin incorrects.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la tentative de connexion admin :', err);
        alert('Une erreur est survenue.');
      }
    });
  }

  goToUserLogin(): void {
    this.router.navigate(['/user']);
  }
}
