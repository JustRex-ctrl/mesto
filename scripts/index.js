const profileButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name-title');
let profileActivity = document.querySelector('.profile__activity');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

//откытие popup
function openPopup(event) {
  event.preventDefault();

  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = profileActivity.textContent;
}
profileButton.addEventListener('click', openPopup);

//функция закрытия popup1
function closePopup(){
  popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', closePopup);

//функция изменения значиний
function handleFormSubmit (evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;

    closePopup();
}

//отправка формы
let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);








