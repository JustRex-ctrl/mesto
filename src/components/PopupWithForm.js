import Popup from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector);
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {

      this._formValues[input.id] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
     this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

  }
}
