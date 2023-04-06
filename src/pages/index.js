import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js'
import {validationConfig, apiSetting} from '../components/constants.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage';
import {Api} from '../components/Api.js';
import {PopupWithWarning} from '../components/PopupWithWarning.js'

const profileButton = document.querySelector('.profile__edit-button');
const popupAdd = '.popup_type_add';
const userActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const userAvatar = document.querySelector('.profile__avatar');
const popupTypeEdit = '.popup_type_edit';
const popupAddForm = document.querySelector('.popup__add');
const profileForm = document.querySelector('.popup__edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupOpenImage = '.popup_type_image-open';
const popupOpenWarning = '.popup-warning';
const userName = document.querySelector('.profile__name-title');
const btnEditAvatar = document.querySelector('.profile__avatar-edit-btn');
const popupEditAvatarForm = document.querySelector('.popup-avatar__form');
const popupEditAvatar = '.popup-avatar';

const elements = '.elements';
let userId;

const api = new Api(apiSetting);

const popupWithImage = new PopupWithImage(popupOpenImage);
const userInfo = new UserInfo({
  name: userName,
  about: userActivity,
  avatar: userAvatar,
});



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, arrayCards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    arrayCards.forEach(item => {
      const card = createCard(item);
    })

  })
  .catch((err) => {
    console.log(err);
  });

//функция создания карточки для форм
const createCard = (data) => {
  const card = new Card(
    data,"#element-template",handleCardClick,
    handleCardRemove, handleCardLike,userId);

  const cardView = card.generateCard();
  return cardView;
};
//
function handleCardLike(card, cardId) {
  if (!card.isLike) {
    api
      .likeCard(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .likeRemove(cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => console.log(err));
  }
}
//
const popupWarning = new PopupWithWarning(
  popupOpenWarning,
  checkBeforeDeletion
);
//
function handleCardRemove(card, cardId) {
  popupWarning.open(card, cardId);
}
//
function checkBeforeDeletion(card) {
  popupWarning.showWaitingText("Удаление...");
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.delete();
      popupWarning.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWarning.showWaitingText("Да");
    });
}

popupWarning.setEventListeners();
//
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}
popupWithImage.setEventListeners();
//
const formAddCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: handleFormAddSubmit,
});
//
function handleFormAddSubmit(cardElement) {
  formAddCard.showWaitingText("Сохранение...");
  api
    .getPlaceCard(cardElement)
    .then((res) => {
      cardsList.addNewItem(createCard(res));
      formAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAddCard.showWaitingText("Создать");
    });
}
//
const formEdit = new PopupWithForm({
  popupSelector: popupTypeEdit,
  handleFormSubmit: handleFormEditSubmit,
});
//
function handleFormEditSubmit(data) {
  formEdit.showWaitingText("Сохранение...");
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      formEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEdit.showWaitingText("Сохранить");
    });
}
formEdit.setEventListeners();
//
const popupWithAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  formSubmit: handleFormEditAvatarSubmit,
});
popupWithAvatar.setEventListeners();

function handleFormEditAvatarSubmit(newLink) {
  popupWithAvatar.showWaitingText('Сохранение...')
  api
    .installAvatar(newLink.avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAvatar.showWaitingText('Сохранить')
    });
}
//
profileAddButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  formAddCard.open();
});

btnEditAvatar.addEventListener("click", () => {
  formProfileValidation.resetValidation();
  popupWithAvatar.open();
});
//

  const popupEditUserProfile = new PopupWithForm({
    popupSelector: popupTypeEdit,
    formSubmit: (userData) => {
      userInfo.setUserInfo(userData);
  }});

    popupEditUserProfile.setEventListeners();
//
profileButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    formProfileValidation.resetValidation();
  popupEditUserProfile.open();
});

//валидация
const formProfileValidation = new FormValidator(validationConfig, profileForm);
formProfileValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();

const formAvatarValidation = new FormValidator(
  validationConfig,
  popupEditAvatarForm
);

//formAvatarValidation.enableValidation();!!!
