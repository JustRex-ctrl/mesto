const profileButton = document.querySelector('.profile__edit-button');
const popupClosingButtons = document.querySelectorAll('.popup__close');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameProfile = document.querySelector('.profile__name-title');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

//откытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//попап редакитрования профиля
profileButton.addEventListener('click', function() {
  nameInput.value = nameProfile.textContent,
  jobInput.value = profileActivity.textContent
  openPopup(popup);
});


//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupClosingButtons.forEach((item)=> item.addEventListener('click', ()=> {
  const currentPopup = item.closest('.popup');
  closePopup(currentPopup);
}));

//отправка формы изменить
const formElement = document.querySelector('.popup__edit');

formElement.addEventListener('submit', function(evt){
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
}

//отрисовка карточек
const elements = document.querySelector('.elements');

const renderElement = (name, link) => {
  const newCard = createElement({name, link})
  elements.append(newCard);
}

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
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
}
popupAddForm.addEventListener('submit', handleAddCard);

//открытие кароточки по нажатию
const popupImageOpen = document.querySelector('.popup_type_image-open');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__title-image');

function setCardImageListener(imageNode) {
  imageNode.addEventListener('click', ({target}) => {
    popupImagePlace.src = target.src;
    popupImagePlace.alt = target.parentElement.querySelector('.card__name-place').textContent;
    popupImageTitle.textContent = target.parentElement.querySelector('.card__name-place').textContent;

    openPopup(popupImageOpen);
  });
}
