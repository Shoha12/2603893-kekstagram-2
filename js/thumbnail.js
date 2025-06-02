import { photoDescriptions } from './photos';


const picturesContainer = document.querySelector('.pictures');


const pictureTemplate = document.querySelector('#picture').content;


const similarPhotos = photoDescriptions();


const similarPhotoFragment = document.createDocumentFragment();


const createThumbnail = ({ id, url, description, likes, comments }) => {
  const similarPhoto = pictureTemplate.cloneNode(true);
  const pictureLink = similarPhoto.querySelector('.picture');


  pictureLink.href = url;


  const pictureImage = similarPhoto.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;
  pictureImage.dataset.id = id;


  similarPhoto.querySelector('.picture__likes').textContent = likes;
  similarPhoto.querySelector('.picture__comments').textContent = comments.length || 0;

  return similarPhoto;
};


const thumbnailRender = () => {
  similarPhotos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    similarPhotoFragment.append(thumbnail);
  });


  picturesContainer.append(similarPhotoFragment);
};


export {similarPhotos , thumbnailRender };


