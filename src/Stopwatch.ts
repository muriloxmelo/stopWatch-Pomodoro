export default class StopWatch {
  private container;
  private inicialMinute;
  private date: Date;
  private minutesContainer: Element;
  private secondsContainer: Element;
  private hoursContainer: Element;
  private startButton: HTMLButtonElement;
  private arrayPomodoro: number[];
  private timeouts: number[];
  private timeoutsPass: number[];
  constructor(container: Element, inicialMinute: number = 25) {
    this.container = container;
    this.inicialMinute = inicialMinute;
    this.date = new Date();
    this.minutesContainer = document.createElement("span");
    this.secondsContainer = document.createElement("span");
    this.hoursContainer = document.createElement("span");
    this.startButton = document.createElement("button");
    this.timeouts = [];
    this.timeoutsPass = [];
    this.arrayPomodoro = [];
    this.init();
  }

  private startButtonStatus() {
    return this.startButton.disabled;
  }

  // METHODS
  reset() {
    this.clearIntervals();
    this.timeoutsPass = [];
    this.timeouts = [];
    this.setTime(this.inicialMinute);
    if (this.startButtonStatus()) {
      this.startButton.disabled = false;
    }
    this.show();
  }

  start() {
    if (this.startButtonStatus() === true) {
      return null;
    }
    if (this.timeouts.length - this.timeoutsPass.length === 0) {
      this.timeoutsPass = [];
      this.timeouts = [];

      this.startButton.disabled = true;
      this.setTime(this.inicialMinute);
      this.play();
    } else {
      this.play();
      this.startButton.disabled = true;
    }
  }

  pause() {
    this.clearIntervals();
    this.startButton.disabled = false;
  }

  setPomodoro(minutes: number = 25, pause: number = 5, longPause: number = 15) {
    const skipButton = document.createElement("button");
    const minInput = document.createElement("input");
    const pauseInput = document.createElement("input");
    const longPauseInput = document.createElement("input");
    this.controlsPomodoro(skipButton, minInput, pauseInput, longPauseInput);

    minInput.value = `${minutes}`;
    pauseInput.value = `${pause}`;
    longPauseInput.value = `${longPause}`;

    this.setTime(minutes);

    this.setArrayPomodoro(minutes, pause, longPause);
    minInput.addEventListener("keyup", () => {
      minutes = +minInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
      this.setTime(minutes);
    });
    minInput.addEventListener("change", () => {
      minutes = +minInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
      this.setTime(minutes);
    });

    pauseInput.addEventListener("keyup", () => {
      pause = +pauseInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
    });
    pauseInput.addEventListener("change", () => {
      pause = +pauseInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
    });

    longPauseInput.addEventListener("keyup", () => {
      longPause = +longPauseInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
    });
    longPauseInput.addEventListener("change", () => {
      longPause = +longPauseInput.value;
      this.setArrayPomodoro(minutes, pause, longPause);
    });

    this.setArrayPomodoro(minutes, pause, longPause);

    skipButton.addEventListener("click", () => {
      if (this.arrayPomodoro.length === 1) {
        this.reset();
        this.setArrayPomodoro(minutes, pause, longPause);
        this.setTime(this.arrayPomodoro[0]);
      } else {
        this.reset();
        this.arrayPomodoro.shift();
        this.setTime(this.arrayPomodoro[0]);
      }
    });
  }

  private setArrayPomodoro(
    time: number,
    pause: number,
    longPause: number
  ): number[] {
    const array = [time, pause, time, pause, time, pause, time, longPause];
    this.arrayPomodoro = array;
    return array;
  }

  private controlsPomodoro(
    skipButton: HTMLButtonElement,
    minInput: HTMLInputElement,
    pauseInput: HTMLInputElement,
    longPauseInput: HTMLInputElement
  ) {
    this.container.appendChild(skipButton);
    skipButton.innerText = "SKIP";
    skipButton.id = "skipButton";

    this.container.appendChild(minInput);
    minInput.placeholder = "Pomodoro time";
    minInput.type = "number";
    minInput.id = "pomodoroTime";

    this.container.appendChild(pauseInput);
    pauseInput.placeholder = "Pause time";
    pauseInput.type = "number";
    pauseInput.id = "pomodoroPause";

    this.container.appendChild(longPauseInput);
    longPauseInput.placeholder = "Long pause";
    longPauseInput.type = "number";
    longPauseInput.id = "pomodoroLongPause";
  }

  setTime(min: number) {
    this.inicialMinute = min;
    this.date.setHours(0, min, 0);
    this.show();
  }

  private play() {
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

  private clearIntervals() {
    this.timeouts.forEach((id) => {
      clearInterval(id);
    });
  }

  private addControls() {
    const h = this.container.appendChild(this.hoursContainer);
    const m = this.container.appendChild(this.minutesContainer);
    const s = this.container.appendChild(this.secondsContainer);
    h.id = "hours";
    m.id = "minutes";
    s.id = "seconds";

    this.container.appendChild(this.startButton);
    this.startButton.innerText = "START";
    this.startButton.id = "startButton";

    const pauseButton = document.createElement("button");
    const pause = this.container.appendChild(pauseButton);
    pauseButton.innerText = "PAUSE";
    pause.id = "pauseButton";

    const resetButton = document.createElement("button");
    this.container.appendChild(resetButton);
    resetButton.innerText = "RESET";
    resetButton.id = "resetButton";

    this.startButton.addEventListener("click", () => {
      this.start();
    });

    pause.addEventListener("click", () => {
      this.pause();
    });

    resetButton.addEventListener("click", () => {
      this.reset();
    });
  }

  private show() {
    if (this.date.getHours() >= 1 && this.date.getHours() < 10) {
      this.hoursContainer.innerHTML = `0${this.date.getHours()}:`;
    } else if (this.date.getHours() > 10) {
      this.hoursContainer.innerHTML = `${this.date.getHours()}:`;
    } else if (this.date.getHours() === 0) {
      this.hoursContainer.innerHTML = "";
    }

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
    this.show();
  }
}
