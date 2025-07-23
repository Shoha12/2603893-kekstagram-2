import { createMessage } from '../utils';
import { sendData } from '../api';

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

let errorMessage = '';

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper__error'
});

function validateHashtag(value) {
  errorMessage = '';

  if (!value) {
    hashtagInput.style.outline = '';
    return true;
  }

  const tags = value.trim().split(/\s+/);

  if (tags.length > 5) {
    errorMessage = 'Вы можете указать не более 5 хэштегов';
    hashtagInput.style.outline = '2px solid gold';
    return false;
  }

  const pattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
  const lowerTags = [];

  for (const tag of tags) {
    if (tag === '#') {
      errorMessage = 'Хэштег не может состоять только из решетки';
      hashtagInput.style.outline = '2px solid gold';
      return false;
    }

    if (!pattern.test(tag)) {
      errorMessage = 'Некорректный хэштег';
      hashtagInput.style.outline = '2px solid gold';
      return false;
    }

    const lowerTag = tag.toLowerCase();
    if (lowerTags.includes(lowerTag)) {
      errorMessage = `Повторяющийся хэштег: ${tag}`;
      return false;
    }

    lowerTags.push(lowerTag);
  }

  hashtagInput.style.outline = '';
  errorMessage = '';

  return true;
}

function validateComment(value) {
  return value.length <= 140;
}

function getHashtagError() {
  return errorMessage;
}

pristine.addValidator(hashtagInput, validateHashtag, getHashtagError);
pristine.addValidator(descriptionInput, validateComment, 'Максимальная длина 140 символов');

export const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        onSuccess('.img-upload__overlay');
        createMessage('success');
        evt.target.reset();
        pristine.reset();
      })
      .catch(() => {
        createMessage('error');
      })
      .finally(() => {
        unblockSubmitButton();
      });
  });
};

