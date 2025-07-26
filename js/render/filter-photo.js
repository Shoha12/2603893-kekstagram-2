import { renderPhoto } from './render-photo';
import { getAllPhotos } from '../get-data';
import { shuffleArray, debounce } from '../utils';

const filterForm = document.querySelector('.img-filters__form');
const filterBtns = document.querySelectorAll('.img-filters__button');

const clearPhotos = () => {
  document.querySelectorAll('.picture').forEach((el) => {
    el.remove();
  });
};

const onFilterDataChange = debounce((filteredImages) => {
  clearPhotos();
  renderPhoto(filteredImages);
}, 500);

const setActiveClass = (target) => {
  filterBtns.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  target.classList.add('img-filters__button--active');
};

const handleFilterClick = (evt) => {
  const target = evt.target;
  let filteredImages = [];

  setActiveClass(target);

  if(!target.closest('.img-filters__button')) {
    return;
  }

  if(target.matches('#filter-random')) {
    filteredImages = [...getAllPhotos()];
    shuffleArray(filteredImages);
    filteredImages = filteredImages.slice(0, 10);
  } else if (target.matches('#filter-discussed')) {
    filteredImages = [...getAllPhotos()].sort((a, b) => b.comments.length - a.comments.length);
  } else if (target.matches('#filter-default')) {
    filteredImages = [...getAllPhotos()];
  }

  onFilterDataChange(filteredImages);
};

const onFilterFormClick = (evt) => {
  handleFilterClick(evt);
};

export const initFilter = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onFilterFormClick);
};

