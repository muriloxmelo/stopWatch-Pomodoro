export default class StopWatch {
  private container;
  private inicialMinute;

  private date: Date;
  private minutesContainer: Element;
  private secondsContainer: Element;
  private timeouts: number[];
  private timeoutsPass: number[];
  constructor(container: Element, inicialMinute: number = 25) {
    this.container = container;
    this.inicialMinute = inicialMinute;
    this.date = new Date();
    this.minutesContainer = document.createElement("span");
    this.secondsContainer = document.createElement("span");
    this.timeouts = [];
    this.timeoutsPass = [];
    this.init();
  }

  reset() {
    this.setTime(this.inicialMinute);
    this.show();
  }

  setTime(min: number) {
    this.inicialMinute = min;
    this.date.setMinutes(min, 0);
  }

  play() {
    /* probably new feature in the future */
    // function addMinutes(date: Date, minutes: number) {
    //   date.setMinutes(date.getMinutes() + minutes);
    //   return date;
    // }
    // function addSeconds(date: Date, seconds: number) {
    //   date.setSeconds(date.getSeconds() + seconds);
    //   return date;
    // }

    function removeSeconds(date: Date, seconds: number) {
      date.setSeconds(date.getSeconds() - seconds);
    }

    if (this.timeoutsPass.length > 0) {
      const nova = this.timeouts.length - this.timeoutsPass.length;
      this.timeoutsPass = [];
      this.timeouts = [];
      for (let i = 0; i < nova; i++) {
        const outroTimeout = setTimeout(() => {
          removeSeconds(this.date, 1);
          this.timeoutsPass.push(outroTimeout);
          this.show();
        }, 1000 * i);
        this.timeouts.push(outroTimeout);
      }
    } else {
      for (let i = 0; i < this.inicialMinute * 60; i++) {
        const firstTimeout = setTimeout(() => {
          removeSeconds(this.date, 1);
          this.timeoutsPass.push(firstTimeout);
          this.show();
        }, 1000 * i);
        this.timeouts.push(firstTimeout);
      }
    }
  }

  private addControls() {
    const m = this.container.appendChild(this.minutesContainer);
    const s = this.container.appendChild(this.secondsContainer);
    m.id = "minutes";
    s.id = "seconds";

    const initButton = document.createElement("button");
    const init = this.container.appendChild(initButton);
    initButton.innerText = "START";
    init.id = "initButton";

    const pauseButton = document.createElement("button");
    const pause = this.container.appendChild(pauseButton);
    pauseButton.innerText = "PAUSE";
    pause.id = "pauseButton";

    const resetButton = document.createElement("button");
    const reset = this.container.appendChild(resetButton);
    reset.innerText = "RESET";
    reset.id = "resetButton";

    init.addEventListener("click", () => {
      if (this.timeouts.length - this.timeoutsPass.length === 0) {
        this.timeoutsPass = [];
        this.timeouts = [];
        this.setTime(this.inicialMinute);
        this.play();
      } else {
        this.play();
      }
    });

    pause.addEventListener("click", () => {
      this.timeouts.forEach((id) => {
        clearInterval(id);
      });
    });

    reset.addEventListener("click", () => {
      this.timeouts.forEach((id) => {
        clearInterval(id);
      });
      this.timeoutsPass = [];
      this.timeouts = [];
      this.reset();
    });
  }

  private show() {
    if (this.date.getMinutes() / 10 < 1) {
      this.minutesContainer.innerHTML = `0${this.date.getMinutes()}:`;
    } else {
      this.minutesContainer.innerHTML = `${this.date.getMinutes()}:`;
    }

    if (this.date.getSeconds() / 10 < 1) {
      this.secondsContainer.innerHTML = `0${this.date.getSeconds()}`;
    } else {
      this.secondsContainer.innerHTML = `${this.date.getSeconds()}`;
    }
  }

  private init() {
    this.reset();
    this.addControls();
    this.setTime(this.inicialMinute);
    this.show();
  }
}
