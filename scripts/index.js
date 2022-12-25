const profileButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelectorAll('.popup__close');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
let nameProfile = document.querySelector('.profile__name-title');
let profileActivity = document.querySelector('.profile__activity');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

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
  nameInput.value = '';
  jobInput.value = '';
}

popupClose.forEach((item)=> item.addEventListener('click', ()=> {
  const currentPopup = item.closest('div').parentElement;
  closePopup(currentPopup);
}));

//отправка формы изменить
let formElement = document.querySelector('.popup__edit');

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

const elementsTemplate = document.querySelector('#elements__template');

const createElements = (elementData) => {
  const element = elementsTemplate.content.querySelector('.elements__item').cloneNode(true);
  const image = element.querySelector('.elements__place-image') ;
  image.src =  elementData.link
  element.querySelector('.elements__name-place').textContent = elementData.name;

  openImagePopup(image)

  element.querySelector('.elements__button-delete').addEventListener('click', ()=> {
    element.remove();
  })

  return element;
}

//отрисовка карточек
const elements = document.querySelector('.elements');

const renderElements = (name, link) => {
  const newCard = createElements({name, link})
  elements.append(newCard);
}

elements.append(...initialCards.map(createElements));

//добавление кароточек
const  popupAddForm = document.querySelector('.popup__add');
const  inputPlaceName = document.querySelector('.popup__input_place-name');
const  inputPlaceImage = document.querySelector('.popup__input_place-image');

const addCard = (evt) => {
  evt.preventDefault(evt);

  const elementName = inputPlaceName.value;
  const link = inputPlaceImage.value;

  renderElements(elementName, link);

  closePopup(popupAdd)
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
}
popupAddForm.addEventListener('submit', addCard);

//открытие кароточки по нажатию
const popupImageOpen = document.querySelector('.popup_image-open');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__title-image');

function openImagePopup(imageNode) {
  imageNode.addEventListener('click', ({target}) => {
    popupImagePlace.src = target.src;
    popupImageTitle.textContent = target.parentElement.querySelector('.elements__name-place').textContent;
    openPopup(popupImageOpen);
  });
}
elements.querySelectorAll('.elements__place-image').forEach(item => {
  openImagePopup(item)
})


//лайки
const ElementsLike = document.querySelectorAll('.elements__like');
ElementsLike.forEach(function(item){
  item.addEventListener('click', function(){
    item.classList.toggle('elements__like');
    item.classList.toggle('elements__like_active');
  });
})







