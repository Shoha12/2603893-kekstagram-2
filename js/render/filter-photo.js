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

const onFilterDataChange = debounce((filteredArray) => {
  clearPhotos();
  renderPhoto(filteredArray);
}, 500);

const setActiveClass = (target) => {
  filterBtns.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  target.classList.add('img-filters__button--active');
};

const handleFilterClick = (evt) => {
  const target = evt.target;
  let filteredArray = [];

  setActiveClass(target);

  if(!target.closest('.img-filters__button')) {
    return;
  }

  if(target.matches('#filter-random')) {
    filteredArray = [...getAllPhotos()];
    shuffleArray(filteredArray);
    filteredArray = filteredArray.slice(0, 10);
  } else if (target.matches('#filter-discussed')) {
    filteredArray = [...getAllPhotos()].sort((a, b) => b.comments.length - a.comments.length);
  } else if (target.matches('#filter-default')) {
    filteredArray = [...getAllPhotos()];
  }

  onFilterDataChange(filteredArray);
};

export const initFilter = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', handleFilterClick);
};

