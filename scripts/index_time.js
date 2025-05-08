let html_time_elem;
let INTERVAL, EXPECTED_TICK;
let weekday, time;


main();

function main() {
  const deDE = 'de-DE';
  const enUS = 'en-US';
  const enGB = 'en-GB';

  weekday = Intl.DateTimeFormat(
    enGB,
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );

  time = new Intl.DateTimeFormat(
    enUS,
    {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  );

  let divElem = document.getElementById('flex-date-time-container').children[0];
  html_time_elem = divElem.children[1];
  
  divElem.children[0].innerText = weekday.format();
  divElem.children[1].innerText = time.format();
  
  sync(startClock);
}

function startClock() {
  INTERVAL = 1000;
  EXPECTED_TICK = Date.now() + INTERVAL;
  setTimeout(tick, INTERVAL);
}

// syncronizes clock to seconds of the os time
function sync(clock) {
  setTimeout(clock, msToNextSecond());
}

// returns time (in ms) until the next second starts
// (roughly +/- 5 ms, cpu / os dependent)
function msToNextSecond() {
  var start = Date.now();
    var now = '' + start;
    var ms = '';
    for (var i = 3; i > 0; i--) {
      ms = ms + now[now.length - i];
    }
    ms = 1000 - parseInt(ms);   // time until next full second starts
  var end = Date.now();

  return ms - (end - start);    // subtract time this function needed to execute
}

// self regulating clock: uses variable time interval to match expected time
function tick() {
  var actually = Date.now();
  var difference = actually - EXPECTED_TICK;
  html_time_elem.innerText = time.format();
  EXPECTED_TICK += INTERVAL;
  setTimeout(tick, Math.max(0, INTERVAL - difference));
}
