import {openPopup, setCardImageListener} from './index.js';

class Card {
  constructor(cardElement, elementsTemplate){
    this._name = cardElement.name;
    this._link = cardElement.link;

    this._elementsTemplate = elementsTemplate;
  }

  _getTemplate(){
    const card = document.querySelector(this._elementsTemplate)
    .content.querySelector('.card').cloneNode(true);

    return card;
  }

  _deleteButton(){
    this._newCard.remove();
    this._newCard = null;
  }

  _likeButton(){
    this._newCard.querySelector('.card__like',).classList.toggle('card__like_active');
  }

  _clickOpenPopupCard(){
    const popupCard = document.querySelector('.popup_type_image-open')
    openPopup(popupCard);

    this._newCard.querySelector('.popup__image-place').src = this._link;
    this._newCard.querySelector('.popup__image-place').alt = this._name;
    this._newCard.querySelector('.popup__title-image').textContent = this._name;
  }

  _setEventListeners(){
     this._newCard.querySelector('.card__button-delete').addEventListener('click', ()=> {this._deleteButton()});

     this._newCard.querySelector('.card__like').addEventListener('click', ()=> {this._likeButton()});

     this._newCard.querySelector('.card__place-image').addEventListener('click', ()=> {setCardImageListener(this._link, this._name);});
  }

  getView(){
    this._newCard = this._getTemplate();
    this._setEventListeners();

    this._newCard.querySelector('.card__place-image').src = this._link;
    this._newCard.querySelector('.card__place-image').alt = this._name;
    this._newCard.querySelector('.card__name-place').textContent = this._name;

    return this._newCard;
  }
}

export default Card;
