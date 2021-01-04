(function () {
  const calrendarSpec = {
    dayList: {
      ko: ['일', '월', '화', '수', '목', '금', '토'],
      en: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
    monthList: {
      ko: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    commonYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  };
  // options = {
  //      date : new Date(),
  //      lang : 'ko'
  // }
  class CalrendarTodo {
    constructor(options) {
      const userOptions = {
        ...{
          date: new Date(),
          lang: 'ko',
        },
        options,
      };

      if (!userOptions.tbody) {
        console.error('tbody를 입력하세요.');
      }

      this._date = userOptions.date;
      this._dayList = calrendarSpec.dayList[userOptions.lang];
      this._monthList = calrendarSpec.monthList[userOptions.lang];
      this._lastDays = this.isLeapYear(this._date)
        ? calrendarSpec.leapYear
        : calrendarSpec.commonYear;
      this._lang = userOptions.lang;

      console.log(this);
    }

    //   getter, setter aear
    get date() {
      return this._date;
    }
    set date(date) {
      //   date 설정에 따른 윤년 계산
      this._date = date;
      this._lastDays = this.isLeapYear(this._date)
        ? calrendarSpec.leapYear
        : calrendarSpec.commonYear;

      this.renderer();
    }
    get lastDays() {
      return this._lastDays;
    }
    //   getter, setter aear

    isLeapYear(date) {
      const year =
        (typeof date === 'object' && date.getFullYear()) || date.getFullYear();

      //  1. 4로 나누어 떨어지고, 100으로 나누어 떨어지지 않으면 윤년
      //  2. 4, 100, 400 으로 나누어 떨어지면 윤년
      if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
        return true;
      } else {
        return false;
      }
    }

    rendererHeader() {
      const $table = document.querySelector('.calendar > thead');

      const day = this._dayList.reduce((acc, cur, idx) => {
        const day = document.createElement('th');
        day.textContent = cur;

        if (0 === idx) {
          day.className = 'sun';
        } else if (6 === idx) {
          day.className = 'sat';
        }

        return [...acc, day];
      }, []);

      const tr = document.createElement('tr');
      tr.className = 'day-of-weeks';
      tr.append(...day);

      $table.append(tr);

      document.querySelector('#current-year-month').innerHTML = `${
        this._monthList[this.date.getMonth()]
      }&nbsp;&nbsp;&nbsp;&nbsp;${this.date.getFullYear()}`;
    }

    renderer() {
      const date = this.date;
      const firstDay = new Date(date.getFullYear(), date.getMonth(), '1');
      const lastDay = this._lastDays[firstDay.getMonth()];

      let day = 1;

      document.getElementsByClassName('calendar-body')[0].innerHTML = '';

      console.log(firstDay, lastDay);

      const weeks = [...new Array(5)]
        .map((v, i) => i)
        .reduce((acc, cur, idx) => {
          const week = document.createElement('tr');

          for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            if ((idx === 0 && i < firstDay.getDay()) || day > lastDay) {
              td.textContent = '';
            } else {
              td.textContent = day++;
            }

            if (0 === i) {
              td.className = 'sun';
            } else if (6 === i) {
              td.className = 'sat';
            }

            week.append(td);
          }

          acc.push(week);
          return acc;
        }, []);
      document.getElementsByClassName('calendar-body')[0].append(...weeks);
    }
  }

  window.CalrendarTodo = CalrendarTodo;
})();
