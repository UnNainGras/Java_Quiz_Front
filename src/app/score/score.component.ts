import { Component, OnInit } from '@angular/core';
import { ScoreService, ScoreDTO } from '../services/score.service';
import { UserService, UserDTO } from '../services/user.service';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  scores: Array<{ userName: string; score: number; date: string }> = [];

  constructor(private scoreService: ScoreService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.scoreService.getScores().pipe(
      switchMap((scores: ScoreDTO[]) => {
        const userRequests = scores.map((score) => this.userService.getUser(score.userId));
        return forkJoin(userRequests).pipe(
          map((users: UserDTO[]) => {
            return scores.map((score, index) => ({
              userName: users[index].nom,
              score: score.score,
              date: score.date,
            })).sort((a, b) => b.score - a.score);
          })
        );
      })
    ).subscribe(
      (data) => {
        this.scores = data;
      },
      (error) => {
        console.error('Erreur en chargeant les scores :', error);
      }
    );
  }
}
