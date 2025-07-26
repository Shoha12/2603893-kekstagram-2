const ALERT_SHOW_TIME = 5000;
let isMessageOpen = false;

export const getMessageData = () => isMessageOpen;
export const setMessageData = (boolean) => {
  isMessageOpen = boolean;
};

export const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const closeModal = (selector) => {
  document.querySelector(selector).classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const openModal = (selector) => {
  document.querySelector(selector).classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const createMessage = (selector) => {
  const template = document.querySelector(`template#${selector}`);
  const clone = template.content.cloneNode(true);
  const selectorEl = clone.querySelector(`.${selector}`);
  const successBtn = selectorEl.querySelector(`.${selector}__button`);


  if (selector === 'data-error') {
    setTimeout(() => {
      if (document.body.contains(selectorEl)) {
        selectorEl.remove();
      }
    }, 5000);
  }

  const onEscPress = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  };

  const onClickOutside = (evt) => {
    if (!evt.target.closest(`.${selector}__inner`)) {
      closeMessage();
    }
  };

  const onButtonClick = () => {
    closeMessage();
  };

  function closeMessage() {
    selectorEl.remove();
    setMessageData(false);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onClickOutside);
    if (successBtn) {
      successBtn.removeEventListener('click', onButtonClick);
    }
  }

  setMessageData(true);

  document.body.append(selectorEl);

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onClickOutside);

  if (successBtn) {
    successBtn.addEventListener('click', onButtonClick);
  }

};


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};


export {getRandomInteger, getRandomArrayElement, closeModal, openModal, showAlert, shuffleArray, debounce, createMessage};
