import { Component, OnInit } from "@angular/core"
import { Link } from "models/links.model"

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = []

  constructor() {
    this.links.push({ name: "Students", href: "students" })
    this.links.push({ name: "Majors", href: "majors" })
    this.links.push({ name: "Quiz/test", href: "quiz" })
    this.links.push({ name: "Users", href: "user" })
    this.links.push({ name: "Score", href: "score" })
    this.links.push({ name: "Question", href: "question" })
    this.links.push({ name: "Admin", href: "admin" })
  }
}
