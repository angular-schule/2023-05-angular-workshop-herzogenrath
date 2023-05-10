import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, timer, Subscription, takeWhile, takeUntil, tap, delay } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe } from '@angular/common';


@Component({
  templateUrl: './unsubscribe.component.html',
  standalone: true,
  imports: [HistoryComponent, AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {

  interval$ = timer(0, 2000).pipe(
    delay(4000),
    // tap(console.log)
  );

  interval$$ = toSignal(timer(0, 2000).pipe(
    delay(4000),
    // tap(console.log)
  ));

  getZahl() {
    // Mit Observables
    this.interval$.subscribe(console.log)

    // Mit Signal
    console.log(this.interval$$())
  }
}
