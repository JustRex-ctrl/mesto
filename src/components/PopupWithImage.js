import Popup from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._link = this._popup.querySelector('.popup__image-place');
    this._name = this._popup.querySelector('.popup__title-image');
  }

  open(link, name) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;

    super.open();
  }
    setEventListeners(){
    super.setEventListeners();
  }
}
