const profileButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
const body = document.querySelector('body');

//откытие popup
profileButton.addEventListener('click', openPopup);
function openPopup(event) {
  event.preventDefault();

  let nameInput = document.querySelector('.profile__name-title').innerText;
  let jobInput = document.querySelector('.profile__activity').innerText;

  body.insertAdjacentHTML('beforeend',`
     <div class="popup popup_opened">
    <div class="popup__container">
      <img class="popup__close link-hover" src="./images/logo/Close Icon.svg" alt="закрыть">
      <h2 class="popup__title">Редактировать профиль</h2>

      <form class="popup__form">
        <input class="popup__input-name" type="text" value="${nameInput}" required>
        <input class="popup__input-job" type="text" value="${jobInput}" required>
        <button class="popup__button" type="submit">Сохранить</button>
      </form>

    </div>
  </div>
`);

//закрытие popup по кнопке / по области вокруг
document.querySelector('.popup__close').addEventListener('click', closePopup);
const popup = document.querySelector('.popup');
popup.addEventListener('click', function(event){
  if(event.target === event.currentTarget){
    closePopup();
  }
});

//отправка формы
let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit);
}

//функция закрытия popup
function closePopup(){
  const popup = document.querySelector('.popup');
  popup.remove();
}

//функция изменения значиний в form
function handleFormSubmit (evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('.popup__input-name').value;
    let jobInput = document.querySelector('.popup__input-job').value;

    document.querySelector('.profile__name-title').innerText = nameInput;
    document.querySelector('.profile__activity').innerText = jobInput;
    closePopup();
}









