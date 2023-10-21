export default class StopWatch {
  minutes;
  seconds;
  constructor(minutes: Element, seconds: Element) {
    this.minutes = minutes;
    this.seconds = seconds;
  }

  show() {
    console.log("maluco");
  }
}
