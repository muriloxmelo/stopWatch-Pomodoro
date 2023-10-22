export default class StopWatch {
  minutesContainer;
  secondsContainer;
  inicialMinute;
  controls;
  date: Date;
  constructor(
    minutesContainer: Element,
    secondsContainer: Element,
    inicialMinute: number = 25,
    controls: Element
  ) {
    this.minutesContainer = minutesContainer;
    this.secondsContainer = secondsContainer;
    this.inicialMinute = inicialMinute;
    this.controls = controls;
    this.date = new Date();

    this.init();
  }

  setTime(min: number) {
    this.inicialMinute = min;
    this.date.setMinutes(min, 0);
  }

  play() {
    const doido = 1;
    console.log(1 / 10);
    function addMinutes(date: Date, minutes: number) {
      date.setMinutes(date.getMinutes() + minutes);
      return date;
    }
    function addSeconds(date: Date, seconds: number) {
      date.setSeconds(date.getSeconds() + seconds);
      return date;
    }
    function removeSeconds(date: Date, seconds: number) {
      date.setSeconds(date.getSeconds() - seconds);
    }
    for (let i = 1; i < this.inicialMinute * 60 + 1; i++) {
      setTimeout(() => {
        removeSeconds(this.date, 1);
        this.show();
      }, 1000 * i);
    }
  }

  show() {
    if (this.date.getMinutes() / 10 < 1) {
      this.minutesContainer.innerHTML = `<span>0${this.date.getMinutes()}</span>`;
    } else {
      this.minutesContainer.innerHTML = `<span>${this.date.getMinutes()}</span>`;
    }

    if (this.date.getSeconds() / 10 < 1) {
      this.secondsContainer.innerHTML = `<span>0${this.date.getSeconds()}</span>`;
    } else {
      this.secondsContainer.innerHTML = `<span>${this.date.getSeconds()}</span>`;
    }
  }

  init() {
    this.setTime(this.inicialMinute);
    this.play();
  }
}
