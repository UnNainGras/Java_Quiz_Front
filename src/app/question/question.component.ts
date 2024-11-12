import { Component, OnInit } from '@angular/core';
import { QuestionService, QuestionDTO } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: QuestionDTO[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }
}
