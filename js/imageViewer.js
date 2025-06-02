import { similarPhotos } from './thumbnail';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const commentCountShown = bigPicture.querySelector('.social__comment-shown-count');
const commentCountTotal = bigPicture.querySelector('.social__comment-total-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsToShow = 5;
let currentIndex = 0;
let currentPhoto = null;


const createCommentElement = ({avatar, message, name}) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;
  const p = document.createElement('p');
  p.className = 'social__text';
  p.textContent = message;
  li.append(img);
  li.append(p);
  return li;
};

const loadMoreComments = (photo) => {
  const commentsFragment = document.createDocumentFragment();
  const nextIndex = Math.min(currentIndex + commentsToShow, photo.comments.length);
  const commentToLoad = photo.comments.slice(currentIndex, nextIndex);
  commentToLoad.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsFragment.append(commentElement);
  });
  socialCommentsContainer.appendChild(commentsFragment);
  currentIndex += commentToLoad.length;
  commentCountShown.textContent = Math.min(currentIndex, photo.comments.length);
  if (currentIndex >= photo.comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

const openFullPhoto = (photo) => {
  currentPhoto = photo;
  bigPictureImage.src = photo.url;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikes.textContent = photo.likes;
  commentCountTotal.textContent = photo.comments.length;
  socialCommentsContainer.innerHTML = '';
  if (photo.comments.length > 0) {
    currentIndex = 0;
    commentCountShown.classList.remove('hidden');
    document.querySelector('.comments-loader').classList.remove('hidden');
    loadMoreComments(photo);
  } else {
    document.querySelector('.comments-loader').classList.add('hidden');
    commentCountShown.classList.add('hidden');
    socialCommentsContainer.innerHTML = '<li class="social__comment">Комментариев нет.</li>';
  }
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const onEscPress = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      closeFullPhoto();
    }
  };

  document.addEventListener('keydown', onEscPress);

  closeButton.addEventListener('click', () => {
    closeFullPhoto();
  });

  const closeFullPhoto = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };
};

const initCommentsLoader = () => {
  const loadButton = document.querySelector('.comments-loader');
  loadButton.addEventListener('click', () => {
    if (currentPhoto) {
      loadMoreComments(currentPhoto);
    }
  });
};

initCommentsLoader();

export const initThumbnailClicks = () => {
  document.querySelectorAll('.picture').forEach((img) => {
    img.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = img.querySelector('.picture__img').dataset.id;
      const photoData = similarPhotos.find((photo) => photo.id === id);
      if(photoData) {
        openFullPhoto(photoData);
      }
    });
  });
};


