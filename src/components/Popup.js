export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); //popup селектор
    this._popupClosingButtons = this._popup.querySelector('.popup__close');

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

  setEventListeners() {
    debugger
    this._popupClosingButtons.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
    });
  }
}
