import { Component, OnInit } from '@angular/core';
import { ScoreService, ScoreDTO } from '../services/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  scores: ScoreDTO[] = [];

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.scoreService.getScores().subscribe((data) => {
      this.scores = data;
    });
  }
}
