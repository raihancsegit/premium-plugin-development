var dateNode = document.getElementsByClassName("eb-countdown-get-date");

function counter() {
  // Return if there is no date node
  if (!dateNode[0]) {
    clearInterval(countdown);
    return;
  }

  var date = dateNode[0].getAttribute("data-date");
  var now = new Date().getTime();
  var time = new Date(date);
  var timer = new Date(time - now);

  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.round(timer / oneDay);
  const hours = timer.getHours();
  const minutes = timer.getMinutes();
  const seconds = timer.getSeconds();

  var daysNode = document.getElementsByClassName("eb-countdown-digits-days");
  var hoursNode = document.getElementsByClassName("eb-countdown-digits-hours");
  var minutesNode = document.getElementsByClassName(
    "eb-countdown-digits-minutes",
  );
  var secondsNode = document.getElementsByClassName(
    "eb-countdown-digits-seconds",
  );

  if (daysNode[0]) {
    daysNode[0].innerHTML = days;
  }

  if (hoursNode[0]) {
    hoursNode[0].innerHTML = hours;
  }

  if (minutesNode[0]) {
    minutesNode[0].innerHTML = minutes;
  }

  if (secondsNode[0]) {
    secondsNode[0].innerHTML = seconds;
  }
}

var countdown = setInterval(counter, 1000);
