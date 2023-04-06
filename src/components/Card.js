export class Card {
  constructor(cardElement, elementsTemplate, handler, handleCardLike, userId){

    this._elementsTemplate = elementsTemplate;
    this._handleCardLike = handleCardLike;

    this._link = cardElement.link;
    this._name = cardElement.name;
    this._cardElement = cardElement;
    this._handler = handler
    this._cardId = cardElement._id;
    this._userId = userId;
    this._ownerId = cardElement.owner._id;
    this._likes = cardElement.likes;
    this._isLike = false;

    this._userId = userId;
  }

  setLikes(anotherLike) {
    const index = this._likes.findIndex((like) => like._id === anotherLike._id);

    if (index === -1) {
      this._likes.push(anotherLike);
      this._btnLike.classList.add("card__like_active");
    } else {
      this._likes.splice(index, 1);
      this._btnLike.classList.remove("card__like_active");
    }

    if (this._isLike) {
      this._isLike = false;
      this._likesCounter.textContent--;
      this._btnLike.classList.remove("card__like_active");
    } else {
      this._isLike = true;
      this._likesCounter.textContent++;
      this._btnLike.classList.add("card__like_active");
    }
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

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {this._handleCardLike(this, this._cardId);});
    this._element.querySelector('.card__button-delete').addEventListener('click', ()=> {this._deleteCard()});
    this._cardImage.addEventListener('click', ()=> {this._handler(this._link, this._name);});
    this._likesCounter.addEventListener('click', () => {this._handleCardLike(this, this._cardId);});
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage =  this._element.querySelector('.card__place-image');
    this._cardTitle = this._element.querySelector('.card__name-place');
    this._btnLike = this._element.querySelector('.card__like');
    this._btnDelete = this._element.querySelector('.card__button-delete');
    this._likesCounter = this._element.querySelector('.element__like-counter');

    if (this._ownerId !== this._userId) this._btnDelete.remove();

    this._cardImage.src = this._cardElemen.link;
    this._cardImage.alt = this._cardElemen.name;
    this._cardTitle.textContent = this._cardElemen.name;
    this._likesCounter.textContent = this._likes.length;

    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._btnLike.classList.add("card__like_active");
        this._isLike = true;
      }
    });

    this._setEventListeners();

    return this._element;

  }
  get isLike() {
    return this._isLike;
  }
}
