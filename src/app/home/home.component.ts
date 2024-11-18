import { Component, OnInit } from "@angular/core"
import { UserService, UserDTO } from '../services/user.service';
import { AdminService, AdminDTO } from '../services/admin.service';
import { Router } from "@angular/router"

@Component({
  selector: "epf-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  authenticatedUser: UserDTO | null = null;
  authenticatedAdmin: AdminDTO | null = null;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticatedUser = this.userService.getAuthenticatedUser();
    this.authenticatedAdmin = this.adminService.getAuthenticatedAdmin();
  }

  logout(): void {
    if (this.authenticatedUser) {
      this.userService.logout();
      this.authenticatedUser = null;
      this.router.navigate(['/user']);
    }
    if (this.authenticatedAdmin) {
      this.adminService.logout();
      this.authenticatedAdmin = null;
      this.router.navigate(['/admin']);
    }
  }

  isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  isAdminLoggedIn(): boolean {
    return this.adminService.isLoggedIn();
  }
}
