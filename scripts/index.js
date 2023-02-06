import Card from './Card.js';
import {FormValidator, validationConfig} from './FormValidator.js'

const profileButton = document.querySelector('.profile__edit-button');
const popupClosingButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameProfile = document.querySelector('.profile__name-title');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const popupTypeEdit = document.querySelector('.popup_type_edit');



//откытие popup
export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupButtonEsc);
};

//попап редакитрования профиля
profileButton.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent,
  jobInput.value = profileActivity.textContent
  openPopup(popupTypeEdit);
});

//функция закрытия popup
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupButtonEsc);
};

popupClosingButtons.forEach((item)=> item.addEventListener('click', ()=> {
  const currentPopup = item.closest('.popup');
  closePopup(currentPopup);
}));

//закрытие popup по нажатию мимо контейнера
popups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item);
    };
  });
});

//закрытие popup при нажатие на esc
function closePopupButtonEsc(evt) {
  if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
  };
};


//отправка формы изменить
const profileForm = document.querySelector('.popup__edit');

profileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;

  closePopup(popupEdit);
});

//попап добавления карточки
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__add_card');
profileAddButton.addEventListener('click', function() {
  openPopup(popupAdd);
  addFormValidation.resetFormButton();
});

//Масив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//отрисовка карточек
const elements = document.querySelector('.elements');

const addCard = (newCard) => {
  elements.prepend(newCard);
};

const renderElement = (cardData) => {
  const card = new Card(cardData, '#card-template');
  const newCard = card.getView();

  addCard(newCard);
};

initialCards.forEach((element) => {
  elements.append(renderElement(element));
});

//добавление кароточек
const  popupAddForm = document.querySelector('.popup__add');
const  inputPlaceName = document.querySelector('.popup__input_place-name');
const  inputPlaceImage = document.querySelector('.popup__input_place-image');

const handleAddCard = (evt) => {
  evt.preventDefault(evt);

  const elementName = inputPlaceName.value;
  const link = inputPlaceImage.value;

  renderElement({name: elementName, link: link});

  closePopup(popupAdd)

  evt.target.reset();
};
popupAddForm.addEventListener('submit', handleAddCard);

//открытие кароточки по нажатию
const popupImageOpen = document.querySelector('.popup_type_image-open');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__title-image');

export function setCardImageListener(title, link){
  openPopup(popupImageOpen);

  popupImagePlace.src = title;
  popupImagePlace.alt = link;
  popupImageTitle.textContent = link;
}

//валидация
const formProfileValidation = new FormValidator(validationConfig, profileForm);
formProfileValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();


