import { NAMES, MESSAGE } from './constants';
import { getRandomArrayElement, getRandomInteger } from './utils';

const createComments = () => {
  const randomMessage = MESSAGE.split('. ');
  const randomMessages = getRandomArrayElement(randomMessage).trim();

  const randomName = getRandomArrayElement(NAMES);
  const randomNumber = getRandomInteger(1, 300);
  const randomAvatar = getRandomInteger(1, 6);

  return {
    id: randomNumber,
    avatar: `img/avatar-${randomAvatar}.svg`,
    message: randomMessages,
    name: randomName
  };
};

export {createComments};
