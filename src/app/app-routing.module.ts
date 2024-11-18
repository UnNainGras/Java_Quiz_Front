import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { QuizComponent } from "quiz/quiz.component";
import { UserComponent } from "./user/user.component";
import { ScoreComponent } from "./score/score.component";
import { QuestionComponent } from "./question/question.component";
import { AdminComponent } from "./admin/admin.component";
import { AddQuestionComponent } from "./add-question/add-question.component"

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'user', component: UserComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: '**', redirectTo: '/user' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
