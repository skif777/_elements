window.addEventListener('DOMContentLoaded', function () {

  openMap()
  //animation()
})

function openMap() {
  const mapContainer = document.querySelector('.map-container');
  const btn = document.querySelector('.button');

  btn.addEventListener('click', function () {

    mapContainer.innerHTML = `<div class="windows8">
    <div class="wBall" id="wBall_1">
      <div class="wInnerBall"></div>
    </div>
    <div class="wBall" id="wBall_2">
      <div class="wInnerBall"></div>
    </div>
    <div class="wBall" id="wBall_3">
      <div class="wInnerBall"></div>
    </div>
    <div class="wBall" id="wBall_4">
      <div class="wInnerBall"></div>
    </div>
    <div class="wBall" id="wBall_5">
      <div class="wInnerBall"></div>
    </div>
  </div>`;

    if (mapContainer.style.display === 'none') {
      getMap()
      mapContainer.style.display = 'flex';
      mapContainer.classList.add('fa-enter');
      raf(function () {
        mapContainer.classList.add('fa-enter-active');
        mapContainer.classList.remove('fa-enter');
      })
      mapContainer.addEventListener('transitionend', hadler);
      function hadler() {
        mapContainer.classList.remove('fa-enter-active');
        mapContainer.removeEventListener('transitionend', hadler);
      };
    } else {
      mapContainer.classList.add('fa-leave');
      raf(function () {
        mapContainer.classList.add('fa-leave-active');
        mapContainer.classList.remove('fa-leave');
      })
      mapContainer.addEventListener('transitionend', hadler);
      function hadler() {
        mapContainer.style.display = 'none';
        //mapContainer.innerHTML = '';
        mapContainer.classList.remove('fa-leave-active');
        mapContainer.removeEventListener('transitionend', hadler);
      };
    }

  })

  async function getMap() {
   try {
      // Шаг 1: начинаем загрузку fetch, получаем поток для чтения
    const url = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A32a4a987ba9afd42027277bec5f2927a06d3f23044be52eb02f4371c31658591&amp;';
    let responseApi = await fetch(url);
    const reader = responseApi.body.getReader();
    console.log(responseApi.ok)
    // Шаг 2: получаем длину содержимого ответа
    const contentLength = +responseApi.headers.get('Content-Length');
    //console.log(contentLength)

    // Шаг 3: считываем данные:
    let receivedLength = 0; // количество байт, полученных на данный момент
    let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)

    // бесконечный цикл, пока идёт загрузка
    while (true) {
      // done становится true в последнем фрагменте
      // value - Uint8Array из байтов каждого фрагмента

      const { done, value } = await reader.read();
      //console.log(value)
      if (done) {
        mapContainer.innerHTML = ''
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
      //console.log(receivedLength)
    }

    // Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for(let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }

    // Шаг 5: декодируем Uint8Array обратно в строку
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // Готово!
    const tagScript = document.createElement('script');
    tagScript.innerHTML = result;
    mapContainer.prepend(tagScript);

    if (!responseApi.ok) {
      mapContainer.innerHTML = 'Ошибка при загрузке'
    }
   } catch (e) {
     throw new Error(e);
   }
  }

}

function animation() {
  const btnClose = document.querySelector('.button-close'),
        btnOpen = document.querySelector('.button-open'),
        divAlert = document.querySelector('.text');

  // Скрытие
  btnClose.addEventListener('click', function () {
    if (divAlert.style.display !== 'none') {
      // 1. Устанавливаем начальное значение от которого начинается скрытие (например opacity: 1)
      divAlert.classList.add('fa-leave');

      // 2. Отправляем в функцию raf кол-бек функцию, которая выполниться после перерисовки браузера
      raf(function () {
        // Устанавливаем конечное значение свойств css при скрытие элемента (например opacity: 0)
        divAlert.classList.add('fa-leave-active');
        // Устанавливаем промежуточное значение свойств css от начала анимации до скрытия 
        divAlert.classList.add('fa-leave-to');
        // Удаляем начальное значение от которого начинается скрытие
        divAlert.classList.remove('fa-leave');
      })

      // 3. Выполняем функцию hadler после события
      divAlert.addEventListener('transitionend', hadler);
      function hadler() {
        divAlert.style.display = 'none';
        divAlert.classList.remove('fa-leave-active');
        divAlert.classList.remove('fa-leave-to');

        // 4. Удаляем подписку на событие
        divAlert.removeEventListener('transitionend', hadler);
      };
    }
  })

  // Появление
  btnOpen.addEventListener('click', function () {
    // 1. Показываем элемент
    divAlert.style.display = 'block';

    // 2. Уставливает начальное значение для анимирования (например opacity: 0)
    divAlert.classList.add('fa-enter');
    
    // 3. Отпраляем в функцию raf кол-бек функцию, которая выполниться после перерисовки браузера
    raf(function () {
      // Уставнавливаем конечное значение css свойств элемента
      divAlert.classList.add('fa-enter-active');
      // Уставливаем промежуточное(временное) значение свойства элемента
      divAlert.classList.add('fa-enter-to');
      // Удалаяем начальное значение анимации
      divAlert.classList.remove('fa-enter');
    })

    // 4. Выполняем функцию hadler после события
    divAlert.addEventListener('transitionend', hadler);
    function hadler() {
      // Удаляем конечное значение css свойств элемента
      divAlert.classList.remove('fa-enter-active');
      // Удаляем промежуточное(временное) значение свойства элемента
      divAlert.classList.remove('fa-enter-to');

      // 5. Удаление подписки на событие
      divAlert.removeEventListener('transitionend', hadler);
    };

  })
}

function raf(fn) {
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      fn()
    })
  })
}

