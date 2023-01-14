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

//объект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  activeButtonClass: 'popup__button_valid',
};

//откытие popup
function openPopup(item) {
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

const elementsTemplate = document.querySelector('#card-template');

const createElement = function (elementData) {
  const element = elementsTemplate.content.querySelector('.card').cloneNode(true);
  const image = element.querySelector('.card__place-image');
  image.src =  elementData.link;
  image.alt = elementData.name;
  element.querySelector('.card__name-place').textContent = elementData.name;

  setCardImageListener(image)

  element.querySelector('.card__button-delete').addEventListener('click', ()=> {
    element.remove();
  });

  //лайки
  element.querySelector('.card__like').addEventListener('click', (evt)=> {
    evt.target.classList.toggle('card__like_active');
  });

  return element;
};

//отрисовка карточек
const elements = document.querySelector('.elements');

const renderElement = (name, link) => {
  const newCard = createElement({name, link})
  elements.prepend(newCard);
};

elements.append(...initialCards.map(createElement));

//добавление кароточек
const  popupAddForm = document.querySelector('.popup__add');
const  inputPlaceName = document.querySelector('.popup__input_place-name');
const  inputPlaceImage = document.querySelector('.popup__input_place-image');

const handleAddCard = (evt) => {
  evt.preventDefault(evt);

  const elementName = inputPlaceName.value;
  const link = inputPlaceImage.value;

  renderElement(elementName, link);

  closePopup(popupAdd)

  evt.target.reset();
};
popupAddForm.addEventListener('submit', handleAddCard);

//открытие кароточки по нажатию
const popupImageOpen = document.querySelector('.popup_type_image-open');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__title-image');

function setCardImageListener(imageNode) {
  imageNode.addEventListener('click', ({target}) => {
    popupImagePlace.src = target.src;
    popupImagePlace.alt = target.alt;
    popupImageTitle.textContent = target.alt;

    openPopup(popupImageOpen);
  });
};

enableValidation(validationConfig);
