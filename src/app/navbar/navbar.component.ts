import { Component, OnInit } from "@angular/core";
import { Link } from "models/links.model";
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isHidden: boolean = false;
  links: Link[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isHidden = currentRoute === '/user' || currentRoute === '/admin';
    });
  }

  ngOnInit(): void {
    this.updateLinks();
  }

  updateLinks(): void {
    if (this.adminService.isLoggedIn()) {
      this.links = [
        { name: "Ajout question", href: "add-question" },
        { name: "Scores", href: "score" }
      ];
    } else if (this.userService.isLoggedIn()) {
      this.links = [
        { name: "Quiz", href: "quiz" },
        { name: "Scores", href: "score" }
      ];
    } else {
      this.links = [
        { name: "Quiz", href: "quiz" },
        { name: "Scores", href: "score" }
      ];
    }
  }
}
