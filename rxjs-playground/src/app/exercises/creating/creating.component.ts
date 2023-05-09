import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // 2. Observer
    const observer = {
      next: (e: string) => this.log(e),
      error: (err: any) => this.log('ERROR ' + err),
      complete: () => this.log('COMPLETE')
    }

    // 1. Observable
    // const observable = of('😎', '😎', '😎')
    const observable = new Observable<string>(subscriber => { // 4. Subscriber

      subscriber.next('😎');
      const x = setTimeout(() => subscriber.next('🤩'), 1000);
      const y = setTimeout(() => { subscriber.next('🧐'); this.log('ZOMBIE CODE! 🧟‍♂️🧟🧟'); }, 2000);
      const z = setTimeout(() => subscriber.error('Etwas ist schief gelaufen!'), 3000);
      const ö = setTimeout(() => subscriber.next('Test'), 4000);


      return () => {
        this.log('Hilfe die Zombies kommen! Schnell aufräumen!');
        clearTimeout(x);
        clearTimeout(y);
        clearTimeout(z);
      }
    });

    // 3. Subscription
    const subscription = observable.subscribe(observer);
    setTimeout(() => subscription.unsubscribe(), 1000);

    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
