import {PopupWithImage} from '../components/PopupWithImage.js';

export class Card {
cardLike = null;
  constructor(cardElement, elementsTemplate){
    this._name = cardElement.name;
    this._link = cardElement.link;

    this._elementsTemplate = elementsTemplate;

  }

  _setCardImageListener(link,name){
    const popupOpenImage = document.querySelector('.popup_type_image-open');
      const popupWithImage = new PopupWithImage(popupOpenImage);
      popupWithImage.open(link,name);
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

  _likeButton() {
    this.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._newCard.querySelector('.card__button-delete').addEventListener('click', ()=> {this._deleteButton()});
    this._newCard.querySelector('.card__like').addEventListener('click', this._likeButton);
    this._cardImage.addEventListener('click', ()=> {this._setCardImageListener(this._link, this._name);});
  }

  _generateCard() {
    this._cardImage =  this._newCard.querySelector('.card__place-image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
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
