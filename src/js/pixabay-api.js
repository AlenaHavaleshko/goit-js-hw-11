
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import '../css/styles.css';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalId = null;

startBtn.disabled = true;

const options = {
  dateFormat: "Y-m-d",
  enableTime: true,         // Enables time picker
  time_24hr: true,          // Displays time picker in 24 hour mode without AM/PM selection when enabled.
  defaultDate: new Date(),  // Sets the initial selected date(s).
  minuteIncrement: 1,       // Adjusts the step for the minute input (incl. scrolling)
  onClose(selectedDates) {

    const selected = selectedDates[0];

    if (selected <= new Date()) {
      iziToast.warning({
        title: '!!!',
        message: 'Please, choose a date in the future',
        position: 'topRight'
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selected;
      startBtn.disabled = false;
    }
  }
};

flatpickr("#datetime-picker", options);              // з бібліотеки flatpickr

startBtn.addEventListener('click', onButtonClick);   // вішаю прослуховувач події на кнопку

function onButtonClick() {                           // при натисканні на кнопку старт

  intervalId = setInterval(() => {
    const diffMS = userSelectedDate - new Date();    // різниця обраної дати і карент дати
    if (diffMS <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: '✔',
        message: 'Time is up!',
        position: 'topRight',
      });
      startBtn.disabled = false;
      return;                                        // зупиняю виконання коду,щоб не ішло у -
    }

    const timeObj = convertMs(diffMS);
    updateClock(timeObj);

  }, 1000);

  startBtn.disabled = true;
}

function updateClock({ days, hours, minutes, seconds }) {
  let d = daysEl.textContent = days.toString().padStart(2, '0');  // Add 0 before
  let h = hoursEl.textContent = hours.toString().padStart(2, '0');
  let m = minutesEl.textContent = minutes.toString().padStart(2, '0');
  let s = secondsEl.textContent = seconds.toString().padStart(2, '0');

  return `${d}:${h}:${m}:${s}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);                                         // Remaining days 
  const hours = Math.floor((ms % day) / hour);                             // Remaining hours 
  const minutes = Math.floor(((ms % day) % hour) / minute);               // Remaining minutes 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);   // Remaining seconds 

  return { days, hours, minutes, seconds };
}
