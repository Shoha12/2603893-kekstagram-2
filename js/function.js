function checkStringLenght (string, length) {
  if(string.length <= length) {
    return true;
  }

  return false;
}

checkStringLenght('проверяемая строка', 20);
checkStringLenght('проверяемая строка', 18);
checkStringLenght('проверяемая строка', 10);

function checkPallid (string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for(let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }

  return newString === normalizeString;
}

checkPallid('топот');
checkPallid('Довод');


function getNumber(string) {
  const newStr = string.toString();
  let getStr = '';

  for (let i = 0; i < newStr.length; i++) {
    if (!isNaN(newStr[i]) && newStr[i] !== ' ') {
      getStr += newStr[i];
    }
  }

  return getStr.length > 0 ? getStr : NaN;
}


getNumber('2023');

const getTimeMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

function haveTime(startTime, endTime, startTimeMeet, durationTime) {
  const meetingStart = getTimeMinutes(startTimeMeet);
  const meetingEnd = meetingStart + durationTime;


  if (meetingStart >= getTimeMinutes(startTime) && meetingEnd <= getTimeMinutes(endTime)) {
    return true;
  }

  return false;
}

haveTime('08:00', '17:30', '14:00', 90);

const messageTemplate = document.querySelector('#message-template').content;
const form = document.querySelector('.chat-form');
const chatForm = form.querySelector('.chat-form-input');
const chatContent = document.querySelector('.chat-content');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = chatForm.value;

  if (text.trim() === '') {
    return;
  }

  const messageClone = document.importNode(messageTemplate, true);

  messageClone.querySelector('.chat-message-text').textContent = text;


  chatContent.appendChild(chatForm);
});

/*

Нужно запрограммировать мессенджер. Как должна работать программа:

— Шаблон сообщения находится в теге template с идентификатором message-template.

— В блоке сообщения (класс chat-message) должен быть текст сообщения, кнопка удаления и имя пользователя.

— Новое сообщение добавляется в конец контейнера с классом chat-content.

— Чтобы добавить новое сообщение, нужно ввести текст в поле ввода (элемент с классом chat-form-input) и нажать кнопку «Отправить» (отправляет данные из формы с классом chat-form).

- Чтобы удалить сообщение, нужно кликнуть по кнопке с крестиком (элемент с классом chat-message-button). Эта кнопка появляется при наведении на сообщение.


*/

{/* <template id="message-template">
<div class="chat-message" tabindex="0">
  <span class="chat-message-name">Неопознанный енот</span>
  <p class="chat-message-text"></p>
  <button class="chat-message-button" type="button">Удалить</button>
</div>
</template> */}

