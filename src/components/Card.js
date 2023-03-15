export class Card {
  constructor(cardElement, elementsTemplate, handler){
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._handler = handler
    this._elementsTemplate = elementsTemplate;

    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
  }

  _getTemplate() {
    const card = document.querySelector(this._elementsTemplate)
    .content.querySelector('.card').cloneNode(true);

    return card;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _clickLikeButton() {
    //this._likeButton = this._newCard.querySelector('.card__like')
    this._likeButton.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.card__button-delete').addEventListener('click', ()=> {this._deleteCard()});
    this._likeButton.addEventListener('click', () => {this._clickLikeButton()});
    this._cardImage.addEventListener('click', ()=> {this._handler(this._link, this._name);});
  }

  _generateCard() {
    this._cardImage =  this._element.querySelector('.card__place-image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__name-place').textContent = this._name;
  }

  getView() {


    this._generateCard();

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
