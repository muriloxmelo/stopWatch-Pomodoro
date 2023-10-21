import StopWatch from "./Stopwatch";

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
if (minutes && seconds) {
  const cronometro = new StopWatch(minutes, seconds);
}
