// ! HTML
// ? Navigation
const navigationBTNS = document.querySelectorAll('.menu__item');    // ? навигация приложения
let currentSection = document.querySelector('.app__generator');  // ? текущая секция приложения

// ? Error
const errorDIV = document.querySelector('.error');          // ? блок ошибки
const errorTextP = document.querySelector('.error__text'); // ? текст ошибки

// ? Push
const pushDIV = document.querySelector('.push');          // ? блок уведомления
const pushTextP = document.querySelector('.push__text'); // ? текст уведомления

// ? Confirm
const confirmDIV = document.querySelector('.confirm');        // ? блок диалогового окна confirm
const confirmYes = document.querySelector('.confirm__yes');  // ? кнопка подтверждения окна confirm
const confirmNo = document.querySelector('.confirm__no');   // ? кнопка отказа окна confirm
 
// ? Prompt
const promptDIV = document.querySelector('.prompt');            // ? блок диалогового окна prompt
const promptINPUT = document.querySelector('.prompt__input')   // ? текстовое поле окна prompt
const promptBTN = document.querySelector('.prompt__submit');  // ? кнопка подтверждения окна prompt

// ? App
const appMAIN = document.querySelector('.app');  // ? блок приложения

// ? Slider
const sliderBTNS = document.querySelectorAll('.slider__btn');  // ? кнопки слайдеров

// ? app__generator
const passwordINPUT = document.querySelector('.password'); // ? <input type="text">
const generateBTN = document.querySelector('.generate');  // ? <btn></btn>

const lengthINPUT = document.querySelector('.length');     // ? <input type="text">
const upperINPUT = document.querySelector('.upper');      // ? <input type="checkbox">
const symblosINPUT = document.querySelector('.symbols'); // ? <input type="checkbox">

// ? app__history 
const historyListHTML = document.querySelector('.history__list');  // ? список истории

const historySliderCurrent = document.querySelector('.app__history').querySelector('.slider__current'); // ? текущая страница слайдера в истории
const historySliderAll = document.querySelector('.app__history').querySelector('.slider__all');        // ? количество страниц слайдера в истории

const historyClear = document.querySelector('.history__clear');  // ? кнопка очищения истории

// ? app__manager
const managerListHTML = document.querySelector('.manager__list');  // ? список менеджера

const managerSliderCurrent = document.querySelector('.app__manager').querySelector('.slider__current'); // ? текущая страница слайдера в менеджере
const managerSliderAll = document.querySelector('.app__manager').querySelector('.slider__all');        // ? количество страниц слайдера в менеджере

// ! Данные
let historyList = [];   // ? массив элементов истории
let managerList = [];  // ? массив элементов менеджера

let historyPage = 1;    // ? текущая страница в истории
let managerPage = 1;   // ? текущая страница в менеджере

let maxElements = 6;  // ? максимальное количество элементов в списках

let confirmValue = 'not value';   // ? значение dialogwindow confirm
let promptValue = 'not value';   // ? значение dialogwindow prompt

// ? Класс методов отображения HTML
class DisplayHTML {
  // TODO: Метод отображения ошибки
  error(text) {
    if (!errorDIV.classList.contains('active') && !pushDIV.classList.contains('active')) {
      // Отображение ошибки на странице
      errorDIV.classList.add('active');
      errorTextP.textContent = text;
      // Отключение ошибки после 3с после показа
      setTimeout(function(){
        errorDIV.classList.remove('active');
        errorTextP.textContent = '';
      }, 3000);
    };
  }
  // TODO: Метод отображения уведомления
  push(text) {
    if (!pushDIV.classList.contains('active') && !errorDIV.classList.contains('active')) {
      // Отображение уведомления на странице
      pushDIV.classList.add('active');
      pushTextP.textContent = text;
      // Отключение уведомления после 3с после показа
      setTimeout(function(){
        pushDIV.classList.remove('active');
        pushTextP.textContent = '';
      }, 3000);
    };
  }
  // TODO: Метод отображения диалогового окна confirm
  confirm(text) {
    // Включение эффекта blur
    appMAIN.style.opacity = '.2';
    // Отображение окна confirm
    confirmDIV.style.display = 'flex';
    // Передача текста в окно
    confirmDIV.querySelector('.confirm__text').textContent = text;
    // Анимация появления
    setTimeout(() => {
      confirmDIV.style.opacity = '1';
    }, 100);
  }
  // TODO: Метод отображения диалогового окна prompt
  prompt(text) {
    // Включение эффекта blur
    appMAIN.style.opacity = '.2';
    // Отображение окна prompt
    promptDIV.style.display = 'flex';
    // Передача текста в окно
    promptDIV.querySelector('.prompt__text').textContent = text;
    // Анимация появления
    setTimeout(() => {
      promptDIV.style.opacity = '1';
    }, 100);
  }
  // TODO: Метод отображения списка истории
  history() { 
    // Обновление maxElements
    maxElements = Math.floor(document.querySelector('.history__list').clientHeight / 62);
    // Проверка валидности historyPage
    if (historyPage * maxElements > historyList.length) {
      historyPage = Math.ceil(historyList.length / maxElements);
    };
    if (historyPage == 0) {
      historyPage += 1;
    };
    // Вычисление индексов старта и конца
    const startIndex = (historyPage - 1) * maxElements;
    const endIndex = historyPage * maxElements - 1;
    // Очистка содержимого history__list
    historyListHTML.innerHTML = '';
    // Обход элементов historyList
    for (let index = startIndex; index <= endIndex; index++) {
      if (index < historyList.length) {
        // Передача элемента в history__list
        historyListHTML.innerHTML += historyList[index].template();
      };
    };
    // Массив ссылков на элементы
    const links = document.querySelectorAll('.history__item');
    // Добавление класса display элементам
    let counter = 0;
    let interval = setInterval(() => {
      if (counter == links.length) {
        clearInterval(interval);
      } else {
        links[counter].classList.add('display');
        counter++;
      };
    }, 100);
    // Обновление показателей слайдера истории
    if (historyList.length) {
      historySliderCurrent.textContent = historyPage;
      historySliderAll.textContent = Math.ceil(historyList.length / maxElements);
    } else {
      historySliderCurrent.textContent = 0;
      historySliderAll.textContent = 0;
    };
  }
  // TODO: Метод отображения списка менеджера
  manager() {
    // Обновление maxElements
    maxElements = Math.floor(document.querySelector('.manager__list').clientHeight / 62);
    // Проверка валидности managerPage
    if (managerPage * maxElements > managerList.length) {
      managerPage = Math.ceil(managerList.length / maxElements);
    };
    if (managerPage == 0) {
      managerPage += 1;
    };
    // Вычисление индексов старта и конца
    const startIndex = (managerPage - 1) * maxElements;
    const endIndex = managerPage * maxElements - 1;
    // Очистка содержимого manager__list
    managerListHTML.innerHTML = '';
    // Обход элементов managerList
    for (let index = startIndex; index <= endIndex; index++) {
      if (index < managerList.length) {
        // Передача элемента в manager__list
        managerListHTML.innerHTML += managerList[index].template();
      };
    };
    // Массив ссылков на элементы
    const links = document.querySelectorAll('.manager__item');
    // Добавление класса display элементам
    let counter = 0;
    let interval = setInterval(() => {
      if (counter == links.length) {
        clearInterval(interval);
      } else {
        links[counter].classList.add('display');
        counter++;
      };
    }, 100);
    // Обновление показателей слайдера менеджера
    if (managerList.length) {
      managerSliderCurrent.textContent = managerPage;
      managerSliderAll.textContent = Math.ceil(managerList.length / maxElements);
    } else {
      managerSliderCurrent.textContent = 0;
      managerSliderAll.textContent = 0;
    };
  }
}

// ? Класс элемента истории
class History {
  constructor (password)  {
    // Поле пароля
    this.password = password,
    // Индекс элемента 
    this.index = 0,   // ? после normalizeHistoryIndex => index == historyList[index].index
    // Получение элемента HTML
    this.template = () => {
      return `
      <li class="history__item">
        <p class="history__password">${this.password.length > 20 ? '*****' : this.password}</p>

        <div class="history__item__tools">
          <button class="history__copy" title="Скопировать" onclick="historyBtnsListener(${this.index}, 'copy')"></button>

          <button class="history__save" title="Сохранить" onclick="historyBtnsListener(${this.index}, 'save')"></button>

          <button class="history__delete" title="Удалить" onclick="historyBtnsListener(${this.index}, 'delete')"></button>
        </div>
      </li>
      `;
    }
  }
  // Метод события //?Скопировать
  copy () {
    navigator.clipboard.writeText(this.password);
    DisplayHTML.prototype.push('Пароль скопирован.');
  }
  // Метод события //?Сохранить
  save () {
    // Отображение prompt в HTML
    DisplayHTML.prototype.prompt('Введите название нового пароля:');
    let checkTitle = setInterval(() => {
      if (promptValue != 'not value') {
        // Создание нового элемента менеджера 
        managerList.unshift(new Manager(promptValue, this.password));
        Manager.prototype.normalizeIndex();
        dataSaveLocal('manager');
        // Отображение в HTML
        DisplayHTML.prototype.push('Запись сохранена в менеджере!');
        promptDIV.style.opacity = '0';
        appMAIN.style.opacity = '1';
        // Ассинхронное отключение
        setTimeout(() => {
          promptDIV.style.display = 'none';
        }, 600);
        promptValue = 'not value';
        clearInterval(checkTitle);
        promptINPUT.value = '';
      }
      if (promptDIV.style.display == 'none') {
        clearInterval(checkTitle);
        promptINPUT.value = '';
      }
    },100);
  }
  // Метод события //?Удалить
  delete () {
    // Получение нужного элемента HTML
    let currentItem = document.querySelectorAll('.history__item')[this.index - (historyPage - 1) * maxElements];
    currentItem.classList.remove('display');
    // Удаление элемента из массива данных и нормализация оставшихся данных
    historyList.splice(this.index, 1);
    this.normalizeIndex();
    dataSaveLocal('history');
    // Отображение в HTML
    setTimeout(() => {
      DisplayHTML.prototype.history();
      DisplayHTML.prototype.push('Элемент истории удален!');
    }, 300);
  }
  // TODO: Обновляет индексы у элементов истории, чтобы  index == historyList[index].index 
  normalizeIndex() {
    for (let i = 0; i < historyList.length; i++) {
      historyList[i].index = i;
    };
  }
};

// ? Класс элемента менеджера
class Manager {
  constructor(title, password) {
    // Поле названия пароля
    this.title = title,
    // Поле пароля
    this.password = password,
    // Индекс элемента
    this.index = 0,
    // Получение элемента HTML
    this.template = () => {
      return `
      <li class="manager__item">
        <h3 class="manager__item__title">${this.title}</h3>

        <p class="manager__password">*****</p>

        <div class="manager__item__tools">
          <button class="manager__see" title="Показать пароль" onclick="managerBtnsListener(${this.index}, 'see')"></button>

          <button class="manager__rename" title="Изменить название пароля" onclick="managerBtnsListener(${this.index}, 'rename')"></button>

          <button class="manager__copy" title="Скопировать" onclick="managerBtnsListener(${this.index}, 'copy')"></button>

          <button class="manager__delete" title="Удалить" onclick="managerBtnsListener(${this.index}, 'delete')"></button>
        </div>
      </li>
      `;
    }
  }
  // Метод события //?Показать пароль
  see() {
    // Отображение пароля HTML
    if (this.password.length <= 20) {
      let currentItem = document.querySelectorAll('.manager__item')[this.index - (managerPage - 1) * maxElements].querySelector('.manager__password');
      currentItem.style.opacity = '0';
      setTimeout(() => {
        if (currentItem.textContent == '*****') {
          currentItem.textContent = this.password;
        } else {
          currentItem.textContent = '*****';
        };
        currentItem.style.opacity = '1';
      }, 210);
    } else {
      DisplayHTML.prototype.error('Этот пароль доступен только для копирования!');
    }
  }
  // Метод события //?Скопировать
  copy() {
    // Копирование пароля в буфер обмена
    navigator.clipboard.writeText(this.password);
    DisplayHTML.prototype.push('Пароль скопирован.');
  }
  // Метод события //?Удалить
  delete() {
    // Получение нужного элемента HTML
    let currentItem = document.querySelectorAll('.manager__item')[this.index - (managerPage - 1) * maxElements];
    currentItem.classList.remove('display');
    // Удаление элемента из массива данных и нормализация оставшихся данных
    managerList.splice(this.index, 1);
    this.normalizeIndex();
    dataSaveLocal('manager');
    // Отображение в HTML
    setTimeout(() => {
      DisplayHTML.prototype.manager();
      DisplayHTML.prototype.push('Элемент менеджера удален!');
    }, 300)
  }
  // Метод события //?Изменить название пароля
  rename() {
    // Отображение prompt
    promptINPUT.value = this.title;
    DisplayHTML.prototype.prompt('Введите новое название: ');
    // Получение нужного элемента HTML
    let currentItem = document.querySelectorAll('.manager__item')[this.index - (managerPage - 1) * maxElements].querySelector('.manager__item__title');
    // Включение алгоритма prompt
    let checkName = setInterval(() => {
      if (promptValue != 'not value') {
        this.title = promptValue;
        promptDIV.style.opacity = '0';
        appMAIN.style.opacity = '1';
        currentItem.style.opacity = '0';
        setTimeout(() => {
          currentItem.textContent = this.title;
          currentItem.style.opacity = '1';
        }, 300);
        // Ассинхронное отключение
        setTimeout(() => {
          promptDIV.style.display = 'none';
        }, 600);
        promptValue = 'not value';
        promptINPUT.value = '';
      };
      if (promptDIV.style.display == 'none') {
        clearInterval(checkName);
        promptINPUT.value = '';
      }
    }, 100);
  }
  // TODO: Обновляет индексы у элементов менеджера, чтобы  index == managerList[index].index 
  normalizeIndex() {
    for (let i = 0; i < managerList.length; i++) {
      managerList[i].index = i;
    };
  }
};

// TODO: Слушает события кнопок элемента истории и вызывает соответствующие методы класса History
const historyBtnsListener = (index, type) => {
  type == 'copy' ? historyList[index].copy() : false;
  type == 'save' ? historyList[index].save() : false;
  type == 'delete' ? historyList[index].delete() : false;
};

// TODO: Слушает события кнопок элемента менеджера и вызывает соответствующие методы класса Manager
const managerBtnsListener = (index, type) => {
  type == 'copy' ? managerList[index].copy() : false;
  type == 'see' ? managerList[index].see() : false;
  type == 'delete' ? managerList[index].delete() : false;
  type == 'rename' ? managerList[index].rename() : false;
};

// TODO: Сохраняет данные в localStorage
const dataSaveLocal = (typeOfData, sectionIndex) => {
  if (typeOfData == 'history') {
    // Сохранение списка истории
    localStorage.history = JSON.stringify(historyList);
  } else if (typeOfData == 'manager') {
    // Сохранение элементов менеджера
    localStorage.manager = JSON.stringify(managerList);
  } else if (typeOfData == 'section') {
    // Сохранение текущей секции
    localStorage.section = JSON.stringify({section: sectionIndex});
  };
}; 

// TODO: Обновление высоты приложения
const updateHeight = () => {
  let newHeight = window.innerHeight;
  document.querySelector('.container').style.height = newHeight;
};

/* 
! Алгоритм создания пароля
? если special => randomCounter = 0..4 (0,1 - буква; 2,3 - цифра; 4 - спец. символ)
?   иначе => randomCounter = 0..3 (0,1 - буква; 2,3 - цифра)
? Буква => если upper => 50% - lower; 50% - upper // Иначе 100% - lower
? Цифра => 0..9
? Спец. символ => из массива рандомный 
*/

// TODO: Генерирует новый пароль
const generationPassword = (psLength, psUpper, psSpecial) => {
  // Массивы символов для пароля
  const enLanguage = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const spLanguage = ['.', ',', '/', '(', ')', '!', '?', '{', '}', '[', ']', '%', '&', '#', '$', '@'];
  // Строка нового пароля
  let password = '';
  // Алгоритм создания
  for (let counter = 0; counter < psLength; counter++) {
    // Переменная символа пароля
    let symbol;
    // Рандомный коофицент, определяющий символ
    let randomCounter;
    // Определение коофицента
    if (psSpecial) {
      randomCounter = Math.floor(Math.random() * 5); 
    } else {
      randomCounter = Math.floor(Math.random() * 4); 
    };
    // Проверка коофицента
    if (randomCounter < 2) {
      // Определение символа
      symbol = enLanguage[Math.floor(Math.random() * enLanguage.length)];
       // Проверка psUpper
      if (psUpper) {
        randomCounter = Math.round(Math.random());
      } else {
        randomCounter = 0;
      };
      // Добавление нового символа
      if (randomCounter == 0) {
        password += symbol;
      } else {
        password += symbol.toUpperCase();
      };
      // Скип итерации
      continue;
    } else if (randomCounter < 4) {
      // Определение символа
      symbol = Math.floor(Math.random() * 10);
      // Добавление нового символа
      password += symbol;
      // Скип итерации
      continue;
    } else {
      // Определение символа
      symbol = spLanguage[Math.floor(Math.random() * spLanguage.length)];
      // Добавление нового символа
      password += symbol;
    };
  };
  // Возвращение созданного пароля
  return password;
};

// * Обход кнопок навигации
for (let index = 0; index < navigationBTNS.length; index++) {
  // TODO: Обрабатывает клик по элементу навигации
  navigationBTNS[index].addEventListener('click', function () {
    // Определение тега data-link у нажатой кнопки
    const section = this.dataset.link;
    // Отключение текущей секции
    currentSection.style.display = 'none';
    // Определение новой секции
    currentSection = document.querySelector(section);
    // Активация новой секции
    currentSection.style.display = 'flex';
    // Анимация появления новой секции
    currentSection.style.opacity = '0';
    setTimeout(()=>{
      currentSection.style.opacity = '1';
    }, 200);
    // Сохранение текущей секции в localStorage
    dataSaveLocal('section', index);
    // Обновление истории
    if (section == '.app__history') {
      DisplayHTML.prototype.history();
    };
    // Обновление менеджера
    if (section == '.app__manager') {
      DisplayHTML.prototype.manager();
    };
  });
};


// TODO: Проверяет валидность данных в поле длины пароля
// ! Валидность на знаки + - . и незначащие нули
lengthINPUT.addEventListener('input', function () {
  // строка значение
  let value = this.value.split('');
  // Проверка на макс. длину
  if (value.length > 3) {
    value.splice(3, 1);
  };
  // Отображение валидного значения
  this.value = value.join('');
});

// TODO: Обрабатывает слушатель события создания пароля
generateBTN.addEventListener('click', () => {
  // Проверка на 0-ую длину
  if (lengthINPUT.value) {
    if (Number(lengthINPUT.value) <= 100) {
      // Получение нового пароля
      const newPassword = generationPassword(lengthINPUT.value, upperINPUT.checked, symblosINPUT.checked);
      // Отображение пароль в input и добавление класса active
      passwordINPUT.value = newPassword;
      passwordINPUT.classList.add('active');
      // Сохранение пароля в историю
      historyList.unshift(new History(newPassword));
      // Нормализация индексов
      History.prototype.normalizeIndex();
      // Обновление history в localStorage
      dataSaveLocal('history');
      // Вызов push
      if (Number(lengthINPUT.value) <= 20) {
        DisplayHTML.prototype.push('Пароль создан и добавлен в историю.');
      } else {
        DisplayHTML.prototype.push('Пароль будет доступен только для копирования.');
      }
    } else {
      DisplayHTML.prototype.error('Макс. длина пароля - 100!');
    }
  } else {
    DisplayHTML.prototype.error('Вы не ввели значение длины пароля!');
  }
});

// * Обход кнопок слайдеров
for (btn of sliderBTNS) {
  // TODO: Обрабатывает слушатель события кнопок слайдера
  btn.addEventListener('click', function() {
    // Алгоритм работы кнопок слайдера
    if (this.dataset.section == 'history') {
      if (this.classList.contains('slider__forward')) {
        if (historyList.length > historyPage * maxElements) {
          historyPage += 1;
          DisplayHTML.prototype.history();
        };
      } else {
        if (historyPage > 1) {
          historyPage -= 1;
          DisplayHTML.prototype.history();
        };
      };
    } else if (this.dataset.section == 'manager') {
      if (this.classList.contains('slider__forward')) {
        if (managerList.length > managerPage * maxElements) {
          managerPage += 1;
          DisplayHTML.prototype.manager();
        };
      } else {
        if (managerPage > 1) {
          managerPage -= 1;
          DisplayHTML.prototype.manager();
        };
      };
    };
  });
};

// TODO: Обрабатывает слушатель события кнопки YES в confirm
confirmYes.addEventListener('click', () => confirmValue = true);
// TODO: Обрабатывает слушатель события кнопки NO в confirm
confirmNo.addEventListener('click', () => confirmValue = false);

// TODO: Обрабатывает слушатель события кнопки SUBMIT в prompt
promptBTN.addEventListener('click', () => {
  // Проверка валидности ввода в prompt
  if (promptINPUT.value.trim()) {
    if (promptINPUT.value.length <= 8) {
      promptValue = promptINPUT.value.trim();
    } else {
      DisplayHTML.prototype.error('Макс. длина названия - 8!');
    };
  } else {
    DisplayHTML.prototype.error('Вы не ввели название!');
  };
})

// TODO: Обрабатывает слушатель события кнопки очистки истории
historyClear.addEventListener('click', () => {
  if (historyList.length) {
    // Отображение confirm в HTML
    DisplayHTML.prototype.confirm('Вы действительно хотите очистить историю?');
    // Запуск проверки на значение
    let checkConfirm = setInterval(() => {
      if (confirmValue != 'not value') {
        if (confirmValue == true) {
          // Анимация растворения
          for (item of document.querySelectorAll('.history__item')) {
            item.classList.remove('display');
          };
          setTimeout(() => {
            // Очищаем historyList
            historyList = [];
            // Сохраняем данные в localStorage
            dataSaveLocal('history');
            // Обновляем HTML
            DisplayHTML.prototype.history();
            // Отображение уведомления
            DisplayHTML.prototype.push('История очищена!');
          }, 200)
        }
        confirmDIV.style.opacity = '0';
        appMAIN.style.opacity = '1';
        // Ассинхронное отключение
        setTimeout(() => {
          confirmDIV.style.display = 'none';
        }, 600);
        clearInterval(checkConfirm);
        confirmValue = 'not value';
      }
      if (confirmDIV.style.display == 'none') {
        clearInterval(checkConfirm)
      };
    }, 100);
  } else {
    // Отображение ошибки
    DisplayHTML.prototype.error('Ваша история пуста!');
  }
});

// TODO: Обрабатывает слушатель события в document
// ? Закрытие диалоговых окон при нажатии вне окна
document.addEventListener('click', (event) => {
  // Текущее открытое dialogWindow
  let dialogWindow;
  // Определение dialogWindow
  if (confirmDIV.style.display == 'flex' && confirmDIV.style.opacity == '1') {
    dialogWindow = document.querySelector('.confirm');
  } else if (promptDIV.style.display == 'flex' && promptDIV.style.opacity == '1') {
    dialogWindow = document.querySelector('.prompt');
  };
  // Если окно открыто
  if (dialogWindow) {
    if (event.target !== dialogWindow && event.path[1] !== dialogWindow && event.path[2] !== dialogWindow) {
      // Отключение dialogWindow
      dialogWindow.style.opacity = '0';
      appMAIN.style.opacity = '1';
      // Ассинхронное отключение
      setTimeout(() => {
        dialogWindow.style.display = 'none';
      }, 600);
    };
  };
});

// TODO: Обрабатывает слушатель события в window, загружает данные
window.addEventListener('load', () => {
  // Загрузка данных из localStorage
  if (localStorage.history) {
    for (item of JSON.parse(localStorage.history)) {
      historyList.push(new History(item.password));
    };
    History.prototype.normalizeIndex();
  };
  if (localStorage.manager) {
    for (item of JSON.parse(localStorage.manager)) {
      managerList.push(new Manager(item.title, item.password));
    };
    Manager.prototype.normalizeIndex();
  };
  if (localStorage.section) {
    navigationBTNS[JSON.parse(localStorage.section).section].click();
  };
  // Обновление высоты приложения
  updateHeight()
});

// TODO: Обрабатывает слушатель события в window, изменяет maxElements
window.addEventListener('resize', () => {
  // Обновление отображения истории при resize window
  if (currentSection.classList.contains('app__history')) {
    DisplayHTML.prototype.history();
  } else if (currentSection.classList.contains('app__manager')) {
    DisplayHTML.prototype.manager();
  };
  // Обновление высоты приложения
  updateHeight()
});

window.addEventListener('scroll', () => {
  updateHeight()
})