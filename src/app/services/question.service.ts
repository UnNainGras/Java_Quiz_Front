import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestionDTO {
  id: number;
  question: string;
  reponseCorrecte: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(`${this.baseUrl}`);
  }

  getQuestion(id: number): Observable<QuestionDTO> {
    return this.http.get<QuestionDTO>(`${this.baseUrl}/${id}`);
  }

  createQuestion(question: QuestionDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(this.baseUrl, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
