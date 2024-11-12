import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: any = {};
  score: number | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe(
      (data) => {
        this.questions = data.questions; // Assurez-vous que cela correspond bien à la structure de votre API
      },
      (error) => {
        console.error('Error fetching quiz data:', error);
      }
    );
  }

  onAnswerSelect(questionIndex: number, answer: string): void {
    this.selectedAnswers[questionIndex] = answer;
  }

  submitQuiz(): void {
    this.score = 0;
  }
}
