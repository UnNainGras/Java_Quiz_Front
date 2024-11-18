import { Component, OnInit } from '@angular/core';
import { QuizService, QuizQuestion } from '../services/quiz.service';
import { ScoreService } from '../services/score.service';
import { UserService, UserDTO } from '../services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  score: number | null = null;
  selectedAnswers: string[] = [];
  userId: number = 0;
  scoreSaved: boolean = false;
  saveError: boolean = false;


  constructor(private quizService: QuizService, private scoreService: ScoreService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadQuiz();
    this.loadUserId();
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

  loadUserId(): void {
    this.userService.getUsers().subscribe(
      (users: UserDTO[]) => {
        if (users.length) {
          this.userId = users[users.length - 1].id;
        } else {
          console.error('No users found.');
        }
      },
      (error) => {
        console.error('Error loading users:', error);
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

    this.saveScore();
  }

  saveScore(): void {
    if (this.score === null) {
      console.error('Score is null. Cannot save.');
      return;
    }

    const scoreDTO = {
      score: this.score,
      date: new Date().toISOString(),
      userId: this.userId,
    };

    this.scoreService.createScore(scoreDTO).subscribe(
      (response) => {
        console.log('Score sauvegardé avec succès :', response);
        this.scoreSaved = true;
        this.saveError = false;
      },
      (error) => {
        console.error('Erreur en sauvegardant le score :', error);
        this.scoreSaved = false;
        this.saveError = true;
      }
    );
  }
}
