import Popup from './Popup';

export class PopupWithWarning extends Popup {
  constructor(popupSelector, confirmFormSubmit) {
    super(popupSelector);
    this._btnSubmit = this._popup.querySelector('.popup__button');
    this._form = this._popup.querySelector('.popup__form');
    this._confirmFormSubmit = confirmFormSubmit;
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  showWaitingText(text) {
    this._btnSubmit.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmFormSubmit(this._cardId, this._card);
    });
  }
}
