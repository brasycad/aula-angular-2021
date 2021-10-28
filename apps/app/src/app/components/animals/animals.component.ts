import { Component } from '@angular/core';
import * as _ from 'lodash'
import { Observable, timer, fromEvent } from 'rxjs';
import { map, mapTo, tap, filter, takeUntil } from 'rxjs/operators';
import { inOutAnimation } from '../../../../../../libs/animations/animations';

@Component({
  selector: 'aula-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  animations: [inOutAnimation]
})
export class AnimalsComponent {
  public list$: Observable<number[]> | undefined
  public show = false
  public source$ = fromEvent(document, 'click')
    .pipe(tap(console.log))
  ngOnInit() {

    const list: number[] = []
    this.list$ = timer(3000, 1000)
      .pipe(
        map((i) => list.push(i)),
        takeUntil(this.source$),
        tap(console.log),
        mapTo(list)
      )

  }
  toggle() {
    this.show = !this.show
  }
}
