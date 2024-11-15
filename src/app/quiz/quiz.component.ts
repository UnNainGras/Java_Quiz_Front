import { Component, OnInit } from '@angular/core';
import { QuizService, QuizQuestion } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  score: number | null = null;
  selectedAnswers: string[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getQuizData().subscribe(
      (data) => {
        this.questions = data;
        console.log('Quiz questions loaded:', this.questions);
      },
      (error) => {
        console.error('Error loading quiz data:', error);
      }
    );
  }

  onAnswerSelect(questionIndex: number, selectedAnswer: string): void {
    this.selectedAnswers[questionIndex] = selectedAnswer;
  }

  submitQuiz(): void {
    if (!this.questions.length) {
      console.error('No questions loaded.');
      return;
    }
    this.score = this.questions.reduce((score, question, index) => {
      return score + (this.selectedAnswers[index] === question.reponseCorrecte ? 1 : 0);
    }, 0);
    console.log('Quiz submitted. Score:', this.score);
  }
}
