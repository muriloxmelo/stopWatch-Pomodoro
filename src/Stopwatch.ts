export default class StopWatch {
  container;
  inicialMinute;
  controls;
  date: Date;
  minutesContainer: Element;
  secondsContainer: Element;
  timeouts: number[];
  timeoutsPass: number[];
  constructor(
    container: Element,
    inicialMinute: number = 25,
    controls: Element
  ) {
    this.container = container;
    this.inicialMinute = inicialMinute;
    this.controls = controls;
    this.date = new Date();
    this.minutesContainer = document.createElement("span");
    this.secondsContainer = document.createElement("span");
    this.timeouts = [];
    this.timeoutsPass = [];
    this.init();
  }

  reset() {
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.show();
  }

  setTime(min: number) {
    this.inicialMinute = min;
    this.date.setMinutes(min, 0);
  }

  play() {
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

  addControls() {
    const m = this.container.appendChild(this.minutesContainer);
    const s = this.container.appendChild(this.secondsContainer);
    m.id = "minutes";
    s.id = "seconds";
    const pauseButton = document.createElement("button");
    const initButton = document.createElement("button");
    const TESTE = document.createElement("button");
    const resetButton = document.createElement("button");
    const pause = this.container.appendChild(pauseButton);
    const init = this.container.appendChild(initButton);
    const TESTE2 = this.container.appendChild(TESTE);
    const resetar = this.container.appendChild(resetButton);
    pauseButton.innerText = "PAUSE";
    initButton.innerText = "INICIAR";
    TESTE2.innerText = "TESTE";
    resetar.innerText = "RESETAR";

    resetar.addEventListener("click", () => {
      this.timeouts.forEach((id) => {
        clearInterval(id);
      });
      this.timeoutsPass = [];
      this.timeouts = [];
      this.reset();
    });

    TESTE2.addEventListener("click", () => {
      console.log(this.timeouts);
      console.log(this.timeoutsPass);
      // console.log("RES:", this.timeouts.length - this.timeoutsPass.length);
    });

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
  }

  show() {
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

  init() {
    this.reset();
    this.addControls();
    this.setTime(this.inicialMinute);
  }
}
