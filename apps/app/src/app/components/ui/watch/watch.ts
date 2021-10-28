/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, Input } from '@angular/core';
import { isUndefined, range, random } from 'lodash'

const ONE_HOUR_DEG = 360 / 12;
const ONE_MINUTE_DEG = 360 / 60;
@Component({
  selector: 'aula-watch',
  templateUrl: `watch.html`,
  styleUrls: ['watch.scss']
})
export class Watch {
  public now: Date = new Date();
  public hours: number | undefined
  public minutes: number | undefined
  private interval: any
  public marks = range(60)
  private delay = 1000
  @Input('external-color') externalColor: string | undefined
  @Input('inner-color') innerColor: string | undefined
  @Input() spinner: boolean | undefined
  ngOnInit() {
    this.externalColor = this.externalColor || 'black'
    this.innerColor = this.innerColor || 'grey-850'
    this.spinner && (this.delay = 3000)
  }
  ngAfterViewInit() {
    setTimeout(() => this.marks.forEach(i => {
      const ele: any = document.querySelector(`#mark-${i}`)
      if (ele)
        if (i % 5 == 0) {
          ele.style.width = '5px'
          ele.style.transform = `translate(-50%,-50%) rotate(${ONE_MINUTE_DEG * i}deg) translateX(36px)`;
        } else {
          ele.style.transform = `translate(-50%,-50%) rotate(${ONE_MINUTE_DEG * i}deg) translateX(37px)`;
        }
    }), 1000)
    this.interval = setInterval(() => this.setTime(this.isSpinner ? new Date(random(1000, 1000000000)) : new Date()), this.delay);
  }
  setTime(time: Date) {
    const hourEl: any = document.querySelector('.needdle-hour');
    const minuteEl: any = document.querySelector('.needdle-minute');
    const secondEl: any = document.querySelector('.needdle-seconds');
    this.hours = time.getHours();
    this.minutes = time.getMinutes();
    const seconds = time.getSeconds();
    hourEl.style.transform = `translate(-50%,-50%) rotate(${((this.hours - 3 + (this.minutes / 60)) * ONE_HOUR_DEG)}deg) translateX(50%) translateX(-3px)`;
    minuteEl.style.transform = `translate(-50%,-50%) rotate(${(this.minutes - 15) * ONE_MINUTE_DEG}deg) translateX(50%) translateX(-3px)`;
    secondEl.style.transform = `translate(-50%,-50%) rotate(${(seconds - 15) * ONE_MINUTE_DEG}deg) translateX(50%)`;
    if (this.isSpinner) {
      const ele: any = document.querySelector('.component-wrapper-1');
      ele.style.transform = `rotate(${random(0, 360)}deg)`;
    }
  }
  ngOnDestroy() {
    clearInterval(this.interval)
  }
  get getClasses() {
    return `external-${this.externalColor} inner-${this.innerColor} ${this.isSpinner ? 'spinner' : ''}`
  }
  get isSpinner(): boolean {
    return !isUndefined(this.spinner)
  }
}
