import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuizQuestion {
  id: number;
  question: string;
  reponses: string[];
  reponseCorrecte: string;
  adminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/quiz';

  constructor(private http: HttpClient) {}

  getQuizData(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(this.apiUrl);
  }
}
