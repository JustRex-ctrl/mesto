import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator, validationConfig} from '../components/FormValidator.js'
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

const profileButton = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_type_add');
const nameProfile = document.querySelector('.profile__name-title');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupInputPlaceName = document.querySelector('.popup__input_place-name');
const popupInputPlaceImage = document.querySelector('.popup__input_place-image');
const popupAddForm = document.querySelector('.popup__add');
const profileForm = document.querySelector('.popup__edit');
const profileAddButton = document.querySelector('.profile__add-button');

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

const elements = document.querySelector('.elements');

const imagesList = new Section({
  items: initialCards,
  renderer: (item) => {
    imagesList.addItem(createCard({name: item.name, link: item.link}));
  }
}, elements
);

imagesList.rendererItems();

//функция создания карточки для форм
function createCard(item) {

  const card = new Card({name: item.name, link: item.link}, '#card-template');

    const test = card.getView();
    return test;
};
//
const popupAddUserFoto = new PopupWithForm(popupAdd,
    { handleFormSubmit: () => {
        const newImage = createCard({name: popupInputPlaceName.value, link: popupInputPlaceImage.value});
        imagesList.addItem(newImage);
    }
    }
  );
  popupAddUserFoto.setEventListeners();

  const userInfo = new UserInfo({name: nameProfile, job: profileActivity});

  const popupEditUserProfile = new PopupWithForm(popupTypeEdit,
    { handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
    }});
    popupEditUserProfile.setEventListeners();

//валидация
const formProfileValidation = new FormValidator(validationConfig, profileForm);
formProfileValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();


profileButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
  popupEditUserProfile.open();
});

//add form
profileAddButton.addEventListener('click', function(){
  popupAddUserFoto.open();
  addFormValidation.resetFormButton();
});
