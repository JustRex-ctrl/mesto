import {Popup} from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);

    this._link = popup.querySelector('.popup__image-place');
    this._name = popup.querySelector('.popup__title-image');
  }

  open(link, name) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;

    super.open();
    super.setEventListeners();
  }
}
