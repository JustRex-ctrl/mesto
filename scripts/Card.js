import {openPopup} from './index.js';

class Card {
cardLike = null;
  constructor(cardElement, elementsTemplate){
    this._name = cardElement.name;
    this._link = cardElement.link;

    this._elementsTemplate = elementsTemplate;

  }

  _getTemplate() {
    const card = document.querySelector(this._elementsTemplate)
    .content.querySelector('.card').cloneNode(true);

    return card;
  }

  _deleteButton() {
    this._newCard.remove();
    this._newCard = null;
  }


//открытие кароточки по нажатию
  setCardImageListener(title, link) {
    const popupImageOpen = document.querySelector('.popup_type_image-open');
    const popupImagePlace = document.querySelector('.popup__image-place');
    const popupImageTitle = document.querySelector('.popup__title-image');
    openPopup(popupImageOpen);

    popupImagePlace.src = title;
    popupImagePlace.alt = link;
    popupImageTitle.textContent = link;
  }

  _likeButton() {
    this.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._newCard.querySelector('.card__button-delete').addEventListener('click', ()=> {this._deleteButton()});
    this._newCard.querySelector('.card__like').addEventListener('click', this._likeButton);
    this._newCard.querySelector('.card__place-image').addEventListener('click', ()=> {this.setCardImageListener(this._link, this._name);});
  }

  _generateCard() {
    const cardImage =  this._newCard.querySelector('.card__place-image');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._newCard.querySelector('.card__name-place').textContent = this._name;

  }

  getView() {
    const newCard = this._getTemplate();
    this._newCard = newCard;

    this._generateCard()

    this._setEventListeners();

    return newCard;
  }
}

export default Card;
