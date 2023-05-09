import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
    templateUrl: './game-score.component.html',
    standalone: true,
    imports: [HistoryComponent]
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((a, b) => a + b, 0),
    ).subscribe(x => this.currentScore = x);

    this.score$.pipe(
      reduce((a, b) => a + b, 0)
    ).subscribe(x => this.finalScore = x);

    // this.score$.pipe(
    //   scan((a, b) => a + b, 0)
    // ).subscribe({
    //   next: x => this.currentScore = x,
    //   complete: () => this.finalScore = this.currentScore
    // });

    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
