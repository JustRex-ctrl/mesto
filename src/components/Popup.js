export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector; //popup селектор
    this._popupClosingButtons = popupSelector.querySelector('.popup__close');
    this._setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupButtonEsc);
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closePopupButtonEsc)
  }

  _closePopupButtonEsc = (evt) => {
    if (evt.key === 'Escape') {
       this.close();
    };
  };

  _setEventListeners() {
    this._popupClosingButtons.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
    });
  }
}
