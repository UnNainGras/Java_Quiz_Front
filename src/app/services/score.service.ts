import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScoreDTO {
  id: number;
  score: number;
  date: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private baseUrl = 'http://localhost:8080/scores';

  constructor(private http: HttpClient) {}

  getScores(): Observable<ScoreDTO[]> {
    return this.http.get<ScoreDTO[]>(`${this.baseUrl}`);
  }

  getScore(id: number): Observable<ScoreDTO> {
    return this.http.get<ScoreDTO>(`${this.baseUrl}/${id}`);
  }

  createScore(score: Omit<ScoreDTO, 'id'>): Observable<ScoreDTO> {
    return this.http.post<ScoreDTO>(this.baseUrl, score);
  }

  deleteScore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
