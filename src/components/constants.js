//объект валидации
export const apiSetting = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '92d09fa8-d610-4d7c-90e6-e3a6e285db98',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  activeButtonClass: 'popup__button_valid',
};

export const userInfoData = {
  profileName: '.profile__name-title',
  profileJob: '.profile__activity'
};
