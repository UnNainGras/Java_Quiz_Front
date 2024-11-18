import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { HttpClientModule } from "@angular/common/http"
import { QuizComponent } from "./quiz/quiz.component";
import {UserComponent} from "./user/user.component";
import {ScoreComponent} from "./score/score.component";
import {QuestionComponent} from "./question/question.component";
import {AdminComponent} from "./admin/admin.component";
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    UserComponent,
    ScoreComponent,
    QuestionComponent,
    AdminComponent,
    NavbarComponent,
    HomeComponent,
    AddQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
