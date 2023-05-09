import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay, take } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';
import { HistoryComponent } from '../../shared/history/history.component';
import { NgFor, AsyncPipe, DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  templateUrl: './multicast.component.html',
  standalone: true,
  imports: [NgFor, HistoryComponent, AsyncPipe, DecimalPipe, JsonPipe]
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Observable<number>; // später: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/

    // 1. unchanged (cold)
    // this.measureValues$ = this.mvs.getValues();

    // 2. share --> Subject (hot)
    //this.measureValues$ = this.mvs.getValues().pipe(share());

    // 3. shareReplay ---> ReplaySubject(X)
    this.measureValues$ = this.mvs.getValues().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }),
    take(3));


    // this.measureValues$ = new ReplaySubject<number>(1);
    // this.mvs.getValues().subscribe(this.measureValues$)

    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
